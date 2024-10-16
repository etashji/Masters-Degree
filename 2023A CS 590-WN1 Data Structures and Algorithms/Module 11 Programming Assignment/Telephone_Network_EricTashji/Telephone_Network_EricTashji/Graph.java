import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

public class Graph {
	ArrayList<ArrayList<Integer>> adjacencies = new ArrayList<ArrayList<Integer>>();
	
	public Graph(int numVertices, int numEdges, ArrayList<ArrayList<Integer>> edges) {
		try {
			
				//Populate adjacencies with empty lists.
				for(int i = 0; i < numVertices; ++i) {
					adjacencies.add(new ArrayList<Integer>());
				}
				
				//Begin adding elements into the list.
				for (int i = 0; i < numEdges; ++i) {
					
					//If this is the first time the element is found, insert into it into the list.
					if (adjacencies.get(edges.get(i).get(0)).isEmpty() == true) {
						adjacencies.get(edges.get(i).get(0)).add(edges.get(i).get(0));
					}
					if (adjacencies.get(edges.get(i).get(1)).isEmpty() == true) {
						adjacencies.get(edges.get(i).get(1)).add(edges.get(i).get(1));
					}
					
					//Insert any other elements into their respective adjacency lists.
					adjacencies.get(edges.get(i).get(0)).add(edges.get(i).get(1));
					adjacencies.get(edges.get(i).get(1)).add(edges.get(i).get(0));
				}
				//Error Checking
			} catch(Exception E) {
				System.out.println("Error in creating the graph.");
			}
		} 
		
	//Finding the list of elements reachable from v using no more than 4 edges.
	public ArrayList<Integer> findVertices(int v, Graph graph) {
		try {
			
			//Variables
			Stack adjacent = new Stack();
			ArrayList<ArrayList<Integer>> adjacencies = graph.adjacencies;
			ArrayList<Integer> explored = new ArrayList<Integer>();
			int depth = 0;
			ArrayList<Integer> depthList = new ArrayList<Integer>();
			Stack temp = new Stack();
			int vertices = 1;
			
			//Setting up the explored array.
			for (int i = 0; i < adjacencies.size(); ++i) {
				explored.add(1);
			}
			explored.set(v, 0);
			
			//Starting with the first index (v).
			adjacent.push(v);
			
			//Performing depth-first search
			while (vertices < adjacencies.size() && depth < 5) {
				while(adjacent.isEmpty() == false) {
					depthList.add((Integer) adjacent.peek());
					for (int i = 0; i < adjacencies.get((Integer)adjacent.peek()).size(); ++i) {
						if (explored.get(adjacencies.get((Integer)adjacent.peek()).get(i)) == 1) {
							explored.set(adjacencies.get((Integer)adjacent.peek()).get(i), 0);
							temp.push(adjacencies.get((Integer)adjacent.peek()).get(i));
							vertices += 1;
						}
					}
					adjacent.pop();
				}
				adjacent = temp;
				temp = new Stack();
				depth += 1;
			}
			if (depth < 5) {
				while (adjacent.isEmpty() == false) {
					depthList.add((Integer)adjacent.pop());
				}
			}
			
			//Return the list of vertices that v can reach using no more than four edges.
			return depthList;
			
			//Catching bugs
		} catch(Exception E) {
			System.out.println("Error in creating a list for one of the vertices.");
			return null;
		}
	}
	
	//Finding the list of elements that each vertex can reach using no more than four edges.
	public ArrayList<ArrayList<Integer>> findAllVertices(Graph graph) {
		try {
			
			//Variables
			ArrayList<ArrayList<Integer>> reachableStations = new ArrayList<ArrayList<Integer>>();
			ArrayList<Integer> foundVertices = new ArrayList<Integer>();
			
			//Find the reachable stations from all elements
			for (int i = 0; i < adjacencies.size(); ++i) {
				foundVertices = graph.findVertices(i, graph);
				reachableStations.add(foundVertices);
			}
			
			//Return the list of lists of vertices reachable from every station.
			return reachableStations;
			
			//Bug Catching
		} catch(Exception E) {
			System.out.println("Error in finding lists for all of the vertices.");
			return null;
		}
		
	}
}
