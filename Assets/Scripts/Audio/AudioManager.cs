using System.Collections;
using UnityEngine;
using Scarlett.Story;

namespace Scarlett.Audio
{
    public sealed class AudioManager : MonoBehaviour
    {
        public static AudioManager Instance { get; private set; }

        [SerializeField] private AudioSource sourceA;
        [SerializeField] private AudioSource sourceB;
        [SerializeField] private float fadeDuration = 1.0f;

        private AudioSource _activeSource;
        private string _currentTrackId;

        private void Awake()
        {
            if (Instance == null)
            {
                Instance = this;
                DontDestroyOnLoad(gameObject);
                _activeSource = sourceA;
            }
            else
            {
                Destroy(gameObject);
            }
        }

        public void PlayMusic(MusicTrackDefinition track)
        {
            if (track == null || track.clip == null)
            {
                StopMusic();
                return;
            }

            if (_currentTrackId == track.trackId)
                return;

            _currentTrackId = track.trackId;
            StartCoroutine(CrossFade(track.clip, track.volume));
        }

        public void StopMusic()
        {
            _currentTrackId = null;
            StartCoroutine(FadeOutActive());
        }

        private IEnumerator CrossFade(AudioClip nextClip, float targetVolume)
        {
            var nextSource = (_activeSource == sourceA) ? sourceB : sourceA;
            
            nextSource.clip = nextClip;
            nextSource.volume = 0;
            nextSource.Play();
            nextSource.loop = true;

            float elapsed = 0;
            float startVolume = _activeSource.volume;

            while (elapsed < fadeDuration)
            {
                elapsed += Time.deltaTime;
                float t = elapsed / fadeDuration;
                
                _activeSource.volume = Mathf.Lerp(startVolume, 0, t);
                nextSource.volume = Mathf.Lerp(0, targetVolume, t);
                yield return null;
            }

            _activeSource.Stop();
            _activeSource.volume = 0;
            _activeSource = nextSource;
            _activeSource.volume = targetVolume;
        }

        private IEnumerator FadeOutActive()
        {
            float elapsed = 0;
            float startVolume = _activeSource.volume;

            while (elapsed < fadeDuration)
            {
                elapsed += Time.deltaTime;
                _activeSource.volume = Mathf.Lerp(startVolume, 0, elapsed / fadeDuration);
                yield return null;
            }

            _activeSource.Stop();
            _activeSource.volume = 0;
        }
    }
}
