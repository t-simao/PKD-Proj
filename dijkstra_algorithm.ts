import { WeightedEdgeList, WeightedGraph, wg_from_edges, wg_new, build_array } from "./lib/graphs";
import { List, list, Pair, pair, tail, head } from "./lib/list";
import { Prio_Queue, empty, is_empty, head as qhead, enqueue, dequeue } from "./lib/prio_queue";




export function dijkstra({adj, size}: WeightedGraph, initial:number, end: number):Pair<Array<number>,number>|null{
    if((initial>=adj.length) || (end>=adj.length)){return null; }
    if((initial<0) || (end<0)){return null; }

    let pending: Prio_Queue<number>=empty();
    let prev_nodes:number[]= new Array(adj.length).fill(-1);
    let dist_array:number[]=new Array(adj.length).fill(Infinity);
    
    dist_array[initial]= 0;

    enqueue(0, initial, pending);

    while(!is_empty(pending)){
        const current_node= qhead(pending);
        dequeue(pending);
        
        if (current_node===end){break;}

        let neighbours = adj[current_node]; 

        while(neighbours!= null){
            const edge= head(neighbours);
            
            const next_node = head(edge);
            const distance = tail(edge); 

            if (dist_array[next_node] > dist_array[current_node] + distance){
                dist_array[next_node] = dist_array[current_node] + distance;
                prev_nodes[next_node] = current_node;
                enqueue(-dist_array[next_node],next_node,pending);
            }


            neighbours= tail(neighbours);
        }

    }
    const path: number[] = [];
    if (dist_array[end] === Infinity) {
        return pair(path, Infinity); 
    }
    let current = end;
    while (current !== -1) {
        path.unshift(current); 
        current = prev_nodes[current];
    }

    return pair(path, dist_array[end]);
}
