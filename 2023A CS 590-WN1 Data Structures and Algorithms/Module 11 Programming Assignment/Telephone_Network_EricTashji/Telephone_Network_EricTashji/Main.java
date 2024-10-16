import java.util.ArrayList;
import java.util.Scanner;

public class Main {

	public static void main(String[] args) {
		
		//Variables
		int numVertices;
		int numEdges;
		ArrayList<ArrayList<Integer>> edges = new ArrayList<ArrayList<Integer>>();
		Scanner scnr = new Scanner(System.in);
		boolean trueNum = false;
		
		try {
			//Taking input
			//Number of vertices
			System.out.println("How many vertices does your graph have?");
			numVertices = scnr.nextInt();
			
			//Ensuring the number of vertices is valid.
			while (trueNum == false) {
				if (numVertices < 1) {
					System.out.println("Error: Number of vertices must be at least 1.");
					System.out.println("Please enter an integer greater than or equal to 1:");
					numVertices = scnr.nextInt();
				}
				else {
					trueNum = true;
				}
			}
			
			//Resetting the boolean
			trueNum = false;
			
			//Number of edges
			System.out.println("How many edges does your graph have?");
			numEdges = scnr.nextInt();
			
			//Ensuring the number of edges is valid.
			while (trueNum == false) {
				if (numEdges < numVertices - 1) {
					System.out.println("Error: Number of edges must be at least the number of vertices - 1.");
					System.out.println("Please enter an integer that fulfills the requirements above:");
					numEdges = scnr.nextInt();
				}
				else {
					trueNum = true;
				}
			}
			
			//Resetting the boolean
			trueNum = false;
			
			//Inputting each edge
			for (int i = 0; i < numEdges; ++i) {
				
				//Variables
				ArrayList<Integer> edge = new ArrayList<Integer>();
				int edgeNum = i + 1;
				int edgeNumber;
				
				//Getting the first vertex connected to the edge.
				System.out.println("What is the first integer of edge " + edgeNum + "?");
				edgeNumber = scnr.nextInt();
				
				//Ensuring the input is valid
				while (trueNum == false) {
					if (edgeNumber >= numVertices || edgeNumber < 0) {
						System.out.print("Error: invalid vertex.\n"
								+ "Vertices must be greater than or equal to 0 and less than the total number of vertices.\n" + 
								"Please enter a new vertex:\n");
						edgeNumber = scnr.nextInt();
					}
					else {
						trueNum = true;
					}
				}
				
				//Adding the first vertex to the edge.
				edge.add(edgeNumber);
				
				//Resetting the boolean
				trueNum = false;
				
				//Getting the second vertex connected to the edge.
				System.out.println("What is the second integer of edge " + edgeNum + "?");
				edgeNumber = scnr.nextInt();
				
				//Ensuring the input is valid.
				while (trueNum == false) {
					if (edgeNumber >= numVertices || edgeNumber < 0) {
						System.out.print("Error: invalid vertex.\n"
								+ "Vertices must be greater than or equal to 0 and less than the total number of vertices.\n" + 
								"Please enter a new vertex:\n\n");
						edgeNumber = scnr.nextInt();
					}
					else {
						trueNum = true;
					}
				}
				
				//Adding the first vertex to the edge.
				edge.add(edgeNumber);
				
				//Resetting the boolean
				trueNum = false;
				
				//Adding the edge to the list of edges.
				edges.add(edge);
			}
			
			//Creating the graph
			Graph graph = new Graph(numVertices, numEdges, edges);
			
			//Finding the reachable stations using less than 5 links.
			ArrayList<ArrayList<Integer>> reachableStations = graph.findAllVertices(graph);
			
			//Displaying all reachable stations.
			for (int i = 0; i < reachableStations.size(); ++i) {
				System.out.print("Stations reachable from station " + i + ": {");
				for (int j = 0; j < reachableStations.get(i).size() - 1; ++j) {
					System.out.print(reachableStations.get(i).get(j) + ", ");
				}
				System.out.print(reachableStations.get(i).get(reachableStations.get(i).size() - 1) + "}\n");
			}
			
		//Error Checking
		} catch (Exception E) {
			System.out.println("Error: Please ensure all inputs are integers.\nProgram terminating.");
		}
	} 
}
