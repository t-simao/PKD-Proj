import { type Prio_Queue, empty, is_empty as pq_is_empty, head as pq_head,
    enqueue, dequeue } from './prio_queue';
import { build_array } from './graphs';
import { head, tail} from './list';

import { type Map, get_node_ht, get_id, get_name_by_id } from './building'

type Path_Info = {

    parents: Array<number | null>,
    pathTypes: Array<string>,
}


/**Calculates the shortest path between source node and the destination node, 
 * potentially avoiding specific Pathway_types
 * 
 * @param {Map} map the map contaning both source and destination nodes and their adjacency lists
 * @param {number} srcId the id of the source node  
 * @param {number} dstId the id of the destination node
 * @param {string} to_avoid paths of this type are avoided when calculating the shortest path
 * 
 * @returns An object containing:
 * - parents: An array containing each nodes parent in the shortest path, null for the 
 * source node and, -1 for every node which is not reachable from the source node. Nodes id corresponds to 
 * the index its information is stored at
 * - pathTypes: An array containing the Pathway_type of the path which leads to the node in the
 * shortest path and, "" for source node and nodes which are not reachable from the source node. Nodes id 
 * corresponds to the index its information is stored at
 */
function dijkstra(map: Map, srcId: number, dstId: number, to_avoid: string): Path_Info {
    const pending: Prio_Queue<number> = empty();
    const distance: Array<number> = build_array(map.size, _ => Infinity);

    const parents: Array<number | null> = build_array(map.size, _ => -1);
    const pathTypes: Array<string> = build_array(map.size, _ => "");

    const result = {
        parents: parents, 
        pathTypes: pathTypes
    };

    distance[srcId] = 0;
    parents[srcId] = null;
    pathTypes[srcId] = "";

    enqueue(0, srcId, pending);

    while(!pq_is_empty(pending)) {
        const current = pq_head(pending); //Idx of the top node
        dequeue(pending);

        if(current === dstId) { break;}

        let adjList = map.adj[current];

        while(adjList !== null) {

            const path = head(adjList);
            let cost = path.weight;
            
            if(path.type === to_avoid) { cost = Infinity};
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

    return result;
}


/**Calculates the shortest path between two nodes using dijkstra algorithm and if a path exists between them,
 * prints it
 * 
 * @param {Map} map the map contaning both source and destination nodes and their adjacency lists
 * @param {string} from the name of the source node
 * @param {string} to the name of the destination node
 * @param {string} to_avoid paths of this type are avoided when calculating the shortest path
 * 
 * @returns -1 if either source or destination node doesn't exist, if from and to are same and
 * if there doesn't exist a path from source node to destination node, otherwise it returns void and
 * prints the path
 */
export function get_path(map: Map, from: string, to: string, to_avoid: string = ""): number | void {
    const src = get_node_ht(map, from); //Lookup by string (name)
    const dst = get_node_ht(map, to); //Lookup by string (name)

    if(src === undefined) {

        console.log(`${from} does not exist, add the place first!!`);
        return -1;

    } else if(dst === undefined) {

        console.log(`${to} does not exist, add the place first!!`);
        return -1;

    } else if(from === to) {
        console.log(`${to} You are at your destination!!`);
        return -1;

    } else {

        const srcId = get_id(src);
        const dstId = get_id(dst);

        const pathInfo = dijkstra(map, srcId, dstId, to_avoid);
        const parents = pathInfo.parents;
        const pathTypes = pathInfo.pathTypes;


        if(parents[dstId] === -1) {

            console.log("Path does not exist!!");
            return;

        } else {

            let currPlc = get_name_by_id(map, dstId);
            let currType = pathTypes[dstId];

            let pathNodes: Array<string> = [currPlc];
            let pathEdges: Array<string> = [currType];

            let parentId = parents[dstId];

            while(parentId !== null && parentId !== -1) {

                currPlc = get_name_by_id(map, parentId);
                currType = pathTypes[parentId];

                pathNodes.push(currPlc);
                pathEdges.push(currType);

                parentId = parents[parentId];
            }          
            
            const steps = pathEdges.length - 1;

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
