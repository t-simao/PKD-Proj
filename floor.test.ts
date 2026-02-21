import { WeightedEdgeList, WeightedGraph, wg_from_edges, wg_new } from "./lib/graphs";
import { List, list, pair ,Pair, tail,head} from "./lib/list";
import { test, describe, expect} from '@jest/globals';
import { dijkstra } from "./dijkstra_algorithm";

describe("Floor creation", ()=>{
 test("Create empty floor", ()=>{
    const eFloor=wg_new(0);
    expect(eFloor.adj.length).toBe(0);
  });

  test("Create simple floor from weighted edge list", ()=>{
    const wel:WeightedEdgeList = list(pair(pair(0,1),4),pair(pair(1,2),5),);
    const floor1 = wg_from_edges(3,wel); 

    expect(floor1.adj).toEqual([list(pair(1,4)),list(pair(0,4),pair(2,5)),list(pair(1,5))]);
  });
  
  test("Create forking floor", ()=>{
    const wel:WeightedEdgeList = list(pair(pair(0,2),5),pair(pair(0,1),4),);
    const floor1 = wg_from_edges(3,wel); 

    expect(floor1.adj).toEqual([list(pair(2,5),pair(1,4)),list(pair(0,4)),list(pair(0,5))]);
  });
  
  test("Create more complex floor", ()=>{
    const wel=list(
              pair(pair(0,2),5),
              pair(pair(0,1),6),
              pair(pair(1,3),7),
              pair(pair(1,4),8),
              pair(pair(2,3),9),
              pair(pair(3,4),10));
    const floor1= wg_from_edges(5,wel);

    const wgAdj: Array<List<Pair<number,number>>> = [
    list(pair(2,5), pair(1,6)),           // Node 0
    list(pair(0,6), pair(3,7), pair(4,8)),// Node 1
    list(pair(0,5), pair(3,9)),           // Node 2
    list(pair(1,7), pair(2,9), pair(4,10)),// Node 3
    list(pair(1,8), pair(3,10))           // Node 4
];

    expect(floor1.adj).toEqual(wgAdj);

  });
  
})

describe("Floor transveral",()=>{
  test("Empty floor has no path", ()=>{
    const eFloor=wg_new(0);
    expect(dijkstra(eFloor,0,0)).toBe(null);
  });

  test("Obtain the distance of a simple linear floor", ()=>{
    const wel:WeightedEdgeList = list(pair(pair(0,1),4),pair(pair(1,2),5),);
    const floor1 = wg_from_edges(3,wel); 
    const fastest_path= dijkstra(floor1,0,2);
    if(fastest_path!=null){
              expect(tail(fastest_path)).toBe(9);
    }
  });

  test("Obtain the path of a simple linear floor", ()=>{
    const wel:WeightedEdgeList = list(pair(pair(0,1),4),pair(pair(1,2),5),);
    const floor1 = wg_from_edges(3,wel); 
    const fastest_path= dijkstra(floor1,0,2);
    if(fastest_path!=null){
              expect(head(fastest_path)).toEqual([0,1,2]);
    }
  });


  test("Navigate more complex floor", ()=>{
    const wel=list(
              pair(pair(0,1),1),
              pair(pair(0,2),2),
              pair(pair(1,3),3),
              pair(pair(1,4),5),
              pair(pair(2,3),4),
              pair(pair(3,4),6));
    const floor1= wg_from_edges(5,wel);

    const fastest_path= dijkstra(floor1,0,3);
    if(fastest_path!=null){
          expect(tail(fastest_path)).toBe(4);
    }

  });

  test("Get path from complex floor", ()=>{
    const wel=list(
              pair(pair(0,1),1),
              pair(pair(0,2),2),
              pair(pair(1,3),3),
              pair(pair(1,4),5),
              pair(pair(2,3),4),
              pair(pair(3,4),6));
    const floor1= wg_from_edges(5,wel);

    const fastest_path= dijkstra(floor1,0,3);
    if(fastest_path!=null){
          expect(head(fastest_path)).toEqual([0,1,3]);
    }

  });

  test("Alternate distance of complex floor", ()=>{
    const wel=list(
              pair(pair(0,1),1),
              pair(pair(0,2),2),
              pair(pair(1,3),3),
              pair(pair(1,4),5),
              pair(pair(2,3),4),
              pair(pair(3,4),6));
    const floor1= wg_from_edges(5,wel);

    const fastest_path= dijkstra(floor1,2,4);
    if(fastest_path!=null){
          expect(tail(fastest_path)).toBe(8);
    }

  });

  test("Alternate path of complex floor", ()=>{
    const wel=list(
              pair(pair(0,1),1),
              pair(pair(0,2),2),
              pair(pair(1,3),3),
              pair(pair(1,4),5),
              pair(pair(2,3),4),
              pair(pair(3,4),6));
    const floor1= wg_from_edges(5,wel);

    const fastest_path= dijkstra(floor1,2,4);
    if(fastest_path!=null){
          expect(head(fastest_path)).toEqual([2,0,1,4]);
    }

  });
})
  