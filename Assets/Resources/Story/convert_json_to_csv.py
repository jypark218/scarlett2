import json
import csv
import re
import os

json_path = r'F:\unity\Scarlett\Assets\Resources\Story\ScarlettFullGraph.json'
csv_path = r'F:\unity\Scarlett\Assets\Resources\Story\MainStoryData.csv'

def convert():
    if not os.path.exists(json_path):
        print(f"Error: {json_path} not found.")
        return

    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    nodes = data.get('nodes', [])
    
    header = ['ID', 'Type', 'Speaker', 'Expression', 'Text', 'Background', 'Music', 'Item', 'Effect', 'NextID']
    
    rows = []
    for node in nodes:
        node_id = node.get('id', '')
        speaker = node.get('speakerId', '')
        text = node.get('text', '')
        expression = node.get('expressionKey', '')
        
        # Priority for Background: backgroundId, then locationId
        background = node.get('backgroundId', '')
        if not background:
            background = node.get('locationId', '')
            
        shake = node.get('shake', False)
        
        # Type logic: node.speakerId가 비어있거나 텍스트에 [이름]: 태그가 없으면 "나레이션", 있으면 "대사"
        has_name_tag = re.search(r'\[.*?\]:', text)
        if speaker and has_name_tag:
            node_type = "대사"
        else:
            node_type = "나레이션"
            
        # Effect logic: node.shake가 true면 "shake:true"
        effect = "shake:true" if shake else ""
        
        # Item logic: 텍스트 내에 [item:...] 태그가 있으면 추출
        item = ""
        # The user specifically mentioned [item:...]
        item_match = re.search(r'\[item:(.*?)\]', text)
        if item_match:
            item = item_match.group(1)
            # Optionally remove from text as per user's suggestion
            text = text.replace(item_match.group(0), "").strip()
        
        # NextID logic: node.nextNodeId. 만약 node.choices가 있다면 "CHOICE:노드ID" 형식으로 기입.
        choices = node.get('choices', [])
        if choices:
            choice_ids = [c.get('nextNodeId', '') for c in choices if c.get('nextNodeId')]
            next_id = "CHOICE:" + "|".join(choice_ids)
        else:
            next_id = node.get('nextNodeId', '')
            
        rows.append({
            'ID': node_id,
            'Type': node_type,
            'Speaker': speaker,
            'Expression': expression,
            'Text': text,
            'Background': background,
            'Music': '', 
            'Item': item,
            'Effect': effect,
            'NextID': next_id
        })
        
    with open(csv_path, 'w', encoding='utf-8-sig', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=header)
        writer.writeheader()
        writer.writerows(rows)
        
    print(f"Successfully converted {len(rows)} nodes to {csv_path}")

if __name__ == "__main__":
    convert()
