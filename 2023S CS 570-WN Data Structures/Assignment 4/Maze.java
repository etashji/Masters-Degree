package Maze;

import java.util.ArrayList;
import java.util.Stack;

/**
 * Class that solves maze problems with backtracking.
 * @author Koffman and Wolfgang
 **/
public class Maze implements GridColors {

    /** The maze */
    private TwoDimGrid maze;

    public Maze(TwoDimGrid m) {
        maze = m;
    }

    /** Wrapper method. */
    public boolean findMazePath() {
    	findAllMazePaths(0,0);
    	findMazePathMin(0,0);
        return findMazePath(0, 0); // (0, 0) is the start point.
    } 
    /**
     * Attempts to find a path through point (x, y).
     * @pre Possible path cells are in BACKGROUND color;
     *      barrier cells are in ABNORMAL color.
     * @post If a path is found, all cells on it are set to the
     *       PATH color; all cells that were visited but are
     *       not on the path are in the TEMPORARY color.
     * @param x The x-coordinate of current point
     * @param y The y-coordinate of current point
     * @return If a path through (x, y) is found, true;
     *         otherwise, false
     */
    public boolean findMazePath(int x, int y) {
        // COMPLETE HERE FOR PROBLEM 1
    	
    	//Code Author: Eric Tashji
    	try {
    		//Base Case 1: Cell is out of bounds
        	if ((x < 0) || (y < 0) || (x > (maze.getNCols() - 1)) || (y > (maze.getNRows() - 1))) {
        		return false;
        	}
        	
        	//Base Case 2: Cell is not non-background
        	else if (maze.getColor(x, y) != NON_BACKGROUND) {
        		return false;
        	}
        	
        	//Base Case 3: Cell is exit cell.
        	else if ((x == (maze.getNCols() - 1)) && (y == (maze.getNRows() - 1))) {
        		maze.recolor(x, y, PATH); 
        		return true;
        	}
        	
        	//Recursion
        	else {
        		maze.recolor(x, y, PATH);
    	    	if(findMazePath(x - 1, y) || findMazePath(x + 1, y) || findMazePath(x, y-1) || findMazePath(x,y+1)) {
    	    		return true;
    	    	}
    	    	else {
    	    		maze.recolor(x,y,TEMPORARY);
    	    		return false;
    	    	}
        	}
    	} catch (Exception e) {
    		System.out.println("Error: There was an error implementing the 'findMazePath' method.");
    		return false;
    	}
    	
    }

    // ADD METHOD FOR PROBLEM 2 HERE
    
    //Method to find all maze Paths
    public ArrayList<ArrayList<PairInt>> findAllMazePaths(int x, int y) {
    	try {
    		ArrayList<ArrayList<PairInt>> result = new ArrayList<>();
        	Stack<PairInt> trace = new Stack<>();
        	findMazePathStackBased(0, 0, result, trace);
        	if(result.size() != 0) {
        		System.out.println("All paths: ");
        		for(int i = 0; i < result.size(); i++) {
        			System.out.print(result.get(i));
        			System.out.println();
        		}
        	}
        	return result;
    	} catch (Exception e) {
    		System.out.println("Error: There was an error implementing the 'findAllMazePaths' method.");
    		return null;
    	}
    	
    	
    }
    
    //Helper Method to find all maze paths.
    public void findMazePathStackBased(int x, int y, ArrayList<ArrayList<PairInt>> result, Stack<PairInt> trace) {
    	try {
    		
    		//Base Case 1: Cell is outside of the maze.
    		if ((x < 0) || (y < 0) || (x > (maze.getNCols() - 1)) || (y > (maze.getNRows() - 1))) {
        		return;
        	}
        	
    		//Base Case 2: Cell is not non-background.
        	else if (maze.getColor(x, y) != NON_BACKGROUND) {
        		return;
        	}
        	
    		//Recursive portion.
        	else if ((x == (maze.getNCols() - 1)) && (y == (maze.getNRows() - 1))) {
        		PairInt now = new PairInt(x, y);
        		ArrayList<PairInt> p = new ArrayList<PairInt>();
        		trace.push(now);
        		p.addAll(trace);
        		result.add(p);
        		trace.pop();
        		return;
        	} 
        	else {
        		PairInt now = new PairInt(x,y);
        		maze.recolor(x, y, PATH);
        		trace.push(now);
        		findMazePathStackBased(x - 1, y, result, trace);
        		findMazePathStackBased(x + 1, y, result, trace);
        		findMazePathStackBased(x, y - 1, result, trace);
        		findMazePathStackBased(x, y + 1, result, trace);
        		trace.pop();
        		maze.recolor(x, y, NON_BACKGROUND);
        	}
    	} catch (Exception e) {
    		System.out.println("Error: There was an error implememting the 'findMazePathStackBased' helper method.");
    	}
    	
    }
    
    // ADD METHOD FOR PROBLEM 3 HERE
    
    //Method to find the shortest maze path from the list of paths.
    public ArrayList<PairInt> findMazePathMin(int x, int y) {
    	try {
    		ArrayList<ArrayList<PairInt>> allPaths = new ArrayList<ArrayList<PairInt>>();
    		Stack<PairInt> trace = new Stack<>();
    		findMazePathStackBased(0, 0, allPaths, trace);
        	ArrayList<PairInt> shortestPath = new ArrayList<PairInt>();
        	int smallestSize = 0;
        	int currSize = 0;
        	for (int i = 0; i < allPaths.size(); ++i) {
        		currSize = allPaths.get(i).size();
        		if ((currSize < smallestSize) || smallestSize == 0) {
        			shortestPath = allPaths.get(i);
        			smallestSize = currSize;
        		}
        	}
        	
        	if (shortestPath.size() != 0) {
        		System.out.println();
            	System.out.println();
            	System.out.println("Shortest Path: ");
        		System.out.print(shortestPath.toString());
        	}
        	return shortestPath;
    	} catch (Exception e) {
    		System.out.println("Error: There was an error implementing the 'findMazePathMin method.");
    		return null;
    	}
    }

    /*<exercise chapter="5" section="6" type="programming" number="2">*/
    public void resetTemp() {
        maze.recolor(TEMPORARY, BACKGROUND);
    }
    /*</exercise>*/

    /*<exercise chapter="5" section="6" type="programming" number="3">*/
    public void restore() {
        resetTemp();
        maze.recolor(PATH, BACKGROUND);
        maze.recolor(NON_BACKGROUND, BACKGROUND);
    }
    /*</exercise>*/
}
/*</listing>*/
