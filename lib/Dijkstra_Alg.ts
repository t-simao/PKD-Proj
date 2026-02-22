import { type Prio_Queue, empty, is_empty as pq_is_empty, head as pq_head,
    enqueue, dequeue } from './prio_queue';
import { build_array } from './graphs';
import { head, tail} from './list';

import {map, type Map, get_node_ht, get_id, get_name_by_id } from './map'

type Path_Info = {

    parents: Array<number | null>,
    pathTypes: Array<string>,
}

function dijkstra(map: Map, srcIdx: number, dstIdx: number, skip_stairs: boolean = false): Path_Info {
    const pending: Prio_Queue<number> = empty();
    const distance: Array<number> = build_array(map.size, _ => Infinity);

    const parents: Array<number | null> = build_array(map.size, _ => -1);
    const pathTypes: Array<string> = build_array(map.size, _ => "");

    const result = {
        parents: parents, 
        pathTypes: pathTypes
    };

    distance[srcIdx] = 0;
    parents[srcIdx] = null;
    pathTypes[srcIdx] = "";

    enqueue(0, srcIdx, pending);

    while(!pq_is_empty(pending)) {
        const current = pq_head(pending); //Idx of the top node
        dequeue(pending);

        if(current === dstIdx) { break;}

        let adjList = map.adj[current];

        while(adjList !== null) {

            const path = head(adjList);
            let cost = path.weight;
            
            if(skip_stairs && path.type === "Stairs") { cost = Infinity};
            const pathDst = path.to; //Idx of the node the path leads to

            if(distance[pathDst] > distance[current] + cost) {

                distance[pathDst] = distance[current] + cost;
                parents[pathDst] = current;
                pathTypes[pathDst] = path.type;

                enqueue(distance[pathDst], pathDst, pending);
            }

            adjList = tail(adjList);
        }
    }
    //console.log(parent_type);
    //console.log("___________________-")
    return result;
}

/** MIGHT BE USEFULL: function make_path(map: Map, id: number, path_arr: Array<string>, prt_arr: Array<number | null>): number | null {

    let currPlc = get_name_by_id(map, id);
    path_arr.push(currPlc);

    return prt_arr[id];

}*/

export function shortest_path(map: Map, from: string, to: string, skip_stairs: boolean = false): number | void {
    const src = get_node_ht(map, from); //Lookup by string (name)
    const dst = get_node_ht(map, to); //Lookup by string (name)

    if(src === undefined) {

        console.log(`${from} does not exist, add the place first!!`);

    } else if(dst === undefined) {

        console.log(`${to} does not exist, add the place first!!`);
        return -1;

    } else if(from === to) {
        console.log(`${to} You are at your destination!!`);
        return -1;

    } else {

        const srcIdx = get_id(src);
        const dstIdx = get_id(dst);

        const pathInfo = dijkstra(map, srcIdx, dstIdx, skip_stairs);
        const parents = pathInfo.parents;
        const pathTypes = pathInfo.pathTypes;

        //console.log(parents);
        //console.log(pathTypes);

        if(parents[dstIdx] === -1) {

            console.log("Path does not exist!!");
            return;

        } else {

            let currPlc = get_name_by_id(map, dstIdx);
            let currType = pathTypes[dstIdx];

            let pathNodes: Array<string> = [currPlc];
            let pathEdges: Array<string> = [currType];

            let parentId = parents[dstIdx];

            while(parentId !== null && parentId !== -1) {

                currPlc = get_name_by_id(map, parentId);
                currType = pathTypes[parentId];

                pathNodes.push(currPlc);
                pathEdges.push(currType);

                parentId = parents[parentId];
            }          
            
            const steps = pathEdges.length - 1;
            //console.log(pathNodes)
            //console.log(pathEdges)
            /** for(let i = steps; i >= 0; i = i - 1) { console.log(`${pathNodes[i]} `); } */

            for(let i = steps; i > 0; i = i - 1) {
                if(i !== 1) {

                    console.log(`${steps - (i - 1)}) ${pathEdges[i - 1]}: ${pathNodes[i]} -> ${pathNodes[i - 1]}`);  
                    
                } else {

                    console.log(`${steps - (i - 1)}) ${pathEdges[i - 1]}: ${pathNodes[i]} -> ${pathNodes[i - 1]} (ARRIVED :)`);

                }     
            }
        }
    }
}

console.log("------------------------- PATH -------------------------");
shortest_path(map,"Entrance","Library");
console.log("------------------------- PATH -------------------------");
shortest_path(map,"Library","Café");
console.log("------------------------- PATH -------------------------");
shortest_path(map,"Entrance","Lounge");
console.log("------------------------- PATH -------------------------");
shortest_path(map,"Entrance","ConferenceRoom", true);
console.log("------------------------- PATH -------------------------");
shortest_path(map,"Library","Library");
console.log("------------------------- PATH -------------------------");
shortest_path(map,"Moon","Library");