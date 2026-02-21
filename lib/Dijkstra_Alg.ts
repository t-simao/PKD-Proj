import { type Prio_Queue, empty, is_empty as pq_is_empty, head as pq_head,
    enqueue, dequeue, display_queue } from './prio_queue';
import { build_array } from './graphs';
import { head, Pair, tail } from './list';

import { map as MAP, type Map } from './map'


function dijkstra(map: Map, srcIdx: number, dstIdx: number): Array<number | null> {

    const pending: Prio_Queue<number> = empty();
    const distance: Array<number> = build_array(map.size, _ => Infinity);
    const parent: Array<number | null> = build_array(map.size, _ => -1);

    distance[srcIdx] = 0;
    parent[srcIdx] = null;
    enqueue(0, srcIdx, pending);

    while(!pq_is_empty(pending)) {
        const current = pq_head(pending); //Idx of the top node
        dequeue(pending);

        if(current === dstIdx) { break;}

        let adjList = map.adj[current];

        while(adjList !== null) {

            const path = head(adjList);
            const cost = path.weight;
            const pathDst = path.to; //Idx of the node the path leads to

            if(distance[pathDst] > distance[current] + cost) {

                distance[pathDst] = distance[current] + cost;
                parent[pathDst] = current;

                enqueue(distance[pathDst], pathDst, pending);
            }

            adjList = tail(adjList);
        }
    }

    return parent;
}
console.log(dijkstra(MAP, 0, 4));

/** export function shortest_path(map: Map, from: string, to: string): number | void {

    const src = get_node_ht(map, from); //Lookup by string (name)
    const dst = get_node_ht(map, to); //Lookup by string (name)

    if(src === undefined) {

        console.log(`${from} does not exist, add the place first!!`);
        return -1;

    } else if(dst === undefined) {

        console.log(`${to} does not exist, add the place first!!`);
        return -1;

    } else {

        const srcIdx = get_id(src);
        const dstIdx = get_id(dst);

        const parents = dijkstra(map, srcIdx, dstIdx);

    }
    
} */