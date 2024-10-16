import java.util.InputMismatchException;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Random;
import java.util.Stack;

//Main class used to process flight requests
public class Flight { 
	
	//A class used to handle individual upgrade requests.
	private static class Flyer { 
		public String status; 	//The Flyer's frequent flyer status
		public int confirmCode; //The Flyer's confirmation code, used for deletion, if necessary.
		
		//A method for creating a new Flyer 
		public Flyer(String status) { 
			try {
				this.status = status; //This sets the Flyer's frequent flyer status.
				this.confirmCode = new Random().nextInt(899999) + 100000; //This assigns the flyer's confirmation code with a new random six-digit integer.
			} catch (Exception E) {
				System.out.println("Error: There was an error in creating the Flyer");
			}
		}
	}
	
	//A class for creating a binary tree, for use with deletion.
	private static class binaryTree {
		
		//A class for each node with in the binary tree. Each node stores a Flyer.
		private static class Node<Flyer> { 	
			public Flyer flyer; //The flyer that the node is storing.
			
			public int height; 	//The node's height within the tree.
			public Node<Flyer> left;  //The node's left node.
			public Node<Flyer> right; //The node's right node.
			public Node<Flyer> parent; //The node's parent.
			
			//A method for creating a new node.
			public Node(Flyer flyer) { 	
				try {
					this.flyer = flyer; //This sets the node's flyer to the flyer that is passed
					this.left = null; //This sets the new Node's left node to null.
					this.right = null; //This sets the new Node's right node to null.
					this.parent = null; //This sets the new Node's parent to null.
					this.height = 0; //This sets the new Node's parent to 0.
				} catch (Exception e) {
					System.out.println("Error: There was an error in creating the node.");
				}
			}
		}
		
		public Node<Flyer> root; //This is the root node of the binary tree.
		
		//This is a method for making a new binary tree.
		public binaryTree(Flyer flyer) { 
			try {
				this.root = new Node(flyer); //This sets the node passed to the method as the root node of the binary tree.
			} catch (Exception E) {
				System.out.println("Error: There was an error in creating the binary Tree.");
			}

		}
		
		//This method will restructure the binary tree if it is unbalanced.
		public void restructure(Node<Flyer> x) { 
			try {
				
				//Variables
				Node<Flyer> a = x; //This marks the node passed to the method as Node a.
				Node<Flyer> b = x.parent; //This marks the node passed to the method's parent as Node b.
				Node<Flyer> c = x.parent.parent; //This marks the node passed to the method's grandparent as Node c.
				Node<Flyer> mid; //This will be used to store the midddle node of a, b, and c.
				Node<Flyer> left; //This will be used to store the left node of mid so that it can be re-added to the binary tree.
				Node<Flyer> right; //This will be used to store the right node of mid so that it can be re-added to the binary tree.
				Node<Flyer> currNode; //This will be used to adjust the heights of various nodes within the binary tree, as necessary.
				Node<Flyer> leftNode; //This will be used to determine the node that should go to the left of mid.
				Node<Flyer> rightNode; //This will be used to determine the node that should go to the right of mid.
				
				//The following if/else statements will determine whether mid is a, b, or c based on their confirmation codes.
				if (((a.flyer.confirmCode < b.flyer.confirmCode) && (a.flyer.confirmCode > c.flyer.confirmCode)) || ((a.flyer.confirmCode > b.flyer.confirmCode) && (a.flyer.confirmCode < c.flyer.confirmCode))) {
					mid = a;
				}
				else if (((b.flyer.confirmCode < a.flyer.confirmCode) && (b.flyer.confirmCode > c.flyer.confirmCode)) || ((b.flyer.confirmCode > a.flyer.confirmCode) && (b.flyer.confirmCode < c.flyer.confirmCode))) {
					mid = b;
				}
				else {
					mid = c;
				}
				
				//The following if/else statements will save the left or right nodes of mid into variables so that they can be re-added to the binary tree later.
				if (mid.left != null && mid.left != a && mid.left != b && mid.left != c) {
					left = mid.left;
					left.parent = null;
					mid.left = null;
				}
				else {
					left = null;
					
				}
				if (mid.right != null && mid.right != a && mid.right != b && mid.right != c) {
					right = mid.right;
					right.parent = null;
					mid.right = null;
				}
				else {
					right = null;
				}
				
				//This if/else statement will determine whether mid is the root, or if it should be set to the parent of c.
				if (root == c) {
					root = mid;
					mid.parent = null;
				}
				else {
					mid.parent = c.parent;
				}
				
				//The following few statements will determine which node is to be placed to the left of mid and which statement should be placed to the right of mid.
				if (mid == a) {
					if (b.flyer.confirmCode < mid.flyer.confirmCode) {
						leftNode = b;
						rightNode = c;
					}
					else {
						leftNode = a;
						rightNode = c;
					}
				}
				else if (mid == b) {
					if (a.flyer.confirmCode < mid.flyer.confirmCode) {
						leftNode = a;
						rightNode = c;
					}
					else {
						leftNode = c;
						rightNode = a;
					}
				}
				else {
					if (b.flyer.confirmCode < mid.flyer.confirmCode) {
						leftNode = b;
						rightNode = a;
					}
					else {
						leftNode = a;
						rightNode = b;
					}
				}
				
				//The following statements will ensure that leftNode and rightNode are not connected to one another.
				if (leftNode.left == a || leftNode.left == b|| leftNode.left == c) {
					leftNode.left = null;
				}
				if (leftNode.right == a || leftNode.right == b || leftNode.right == c) {
					leftNode.right = null;
				}
				if (rightNode.left == a || rightNode.left == b || rightNode.left == c) {
					rightNode.left = null;
				}
				if (rightNode.right == a || rightNode.right == b || rightNode.right == c) {
					rightNode.right = null;
				}
				
				//The following statements will ensure that the left and right nodes have the correct height.
				if (rightNode.right == null && rightNode.left == null) {
					rightNode.height = 0;
				}
				else if (rightNode.right != null && rightNode.left == null) {
					rightNode.height = rightNode.right.height + 1;
				}
				else if (rightNode.right == null && rightNode.left != null) {
					rightNode.height = rightNode.left.height + 1;
				}
				else {
					if (rightNode.right.height > rightNode.left.height) {
						rightNode.height = rightNode.right.height + 1;
					}
					else {
						rightNode.height = rightNode.left.height + 1;
					}
				}
				if (leftNode.right == null && leftNode.left == null) {
					leftNode.height = 0;
				}
				else if (leftNode.right != null && leftNode.left == null) {
					leftNode.height = leftNode.right.height + 1;
				}
				else if (leftNode.right == null && leftNode.left != null) {
					leftNode.height = leftNode.left.height + 1;
				}
				else {
					if (leftNode.right.height > leftNode.left.height) {
						leftNode.height = leftNode.right.height + 1;
					}
					else {
						leftNode.height = leftNode.left.height + 1;
					}
				}
				
				
				mid.left = leftNode; //This sets leftNode to the left node of mid.
				mid.right = rightNode; //This sets rightNode to the right node of mid.
				leftNode.parent = mid; //This sets leftNode's parent to mid.
				rightNode.parent = mid; //This sets rightNode's parent to mid.
				
				//The following if/else statement will set mid's height.
				if (leftNode.height > rightNode.height) {
					mid.height = leftNode.height + 1;
				}
				else {
					mid.height = rightNode.height + 1;
				}
				currNode = mid;
				
				//This will ensure that the height of each parent of mid is adjusted as necessary.
				while (currNode != root) {
					if (currNode.parent.height <= currNode.height) {
						currNode.parent.height = currNode.height + 1;
					}
					currNode = currNode.parent;
				}
				
				//The following two statements will add mid's left and right nodes back into the binary tree, if previously removed.
				if (left != null) {
					add(left.flyer);
				}
				if (right != null) {
					add(right.flyer);
				}
				
				
			} catch (Exception E) {
				System.out.println("Error: There was an error in restructuring the binary tree.");
			}
		}
		
		//This method will check to ensure that the binary tree is balanced.
	public void rebalance(Node<Flyer> addedNode) {
		try {
			
			Node<Flyer> currNode = addedNode; //This is sets the current node to the node that was added to the binary tree.
			Node<Flyer> descendant; //This sets a node that will become a descendant of currNode;
			int leftHeight; //This is the height of the left subtree of currNode.
			int rightHeight; //This is the height of the right subtree of currNode.
			
			//This begins the iteration through the binary tree to check for balancing.
			while (currNode != root) {
				currNode = currNode.parent; //This sets currNode to the parent of the node inserted into the binary tree.
				
				//The following if/else statements will set the left and right heights of the node for comparison.
				if (currNode.left == null) {
					leftHeight = 0;
				}
				else {
					leftHeight = currNode.left.height;
				}
				if (currNode.right == null) {
					rightHeight = 0;
				}
				else {
					rightHeight = currNode.right.height;
				}
				
				//This will then check to see if the difference between the heights is greater than 1. 
				//If so, it will set the descendant to the grandchild of currNode before beginning the restructuring process. 
				if (Math.abs(rightHeight - leftHeight) > 1) {
					descendant = currNode;
					if (currNode.left != null && leftHeight >= rightHeight) {
						descendant = currNode.left;
					}
					else {
						descendant = currNode.right;
					}
					if (descendant.left == null) {
						leftHeight = 0;
					}
					else {
						leftHeight = descendant.left.height;
					}
					if (descendant.right == null) {
						rightHeight = 0;
					}
					else {
						rightHeight = descendant.right.height;
					}
					if (descendant.left != null && leftHeight >= rightHeight) {
						descendant = descendant.left;
					}
					else {
						descendant = descendant.right;
					}
					restructure(descendant);
				}
			}
		} catch (Exception E) {
			System.out.println("Error: There was an error in rebalancing the binary tree.");
		}
	}
		
		//This will add a node to the binary tree.
	public void add(Flyer flyer) {
		try  {
			
			Node<Flyer> newNode = new Node(flyer); //This creates a new node out of the Flyer passed to the method.
			Node<Flyer> currNode = root; //This sets the current node to the binary tree's root.
			
			//This will then begin the iteration process to determine the correct node for insertion.
			while (currNode != null) {
				
				//This will determine if the current node has an empty node to its left or right.
				//If so, it will place it in the appropriate spot, given that the appropriate spot is available.
				if ((currNode.flyer.confirmCode > newNode.flyer.confirmCode) && (currNode.left == null)) {
					currNode.left = newNode;
					newNode.parent = currNode;
					break;
				}
				else if ((currNode.flyer.confirmCode < newNode.flyer.confirmCode) && (currNode.right == null)) {
					currNode.right = newNode;
					newNode.parent = currNode;
					break;
				}
				
				//If the node cannot be placed, currNode will move to the left or right node,
				//depending on the confirmation code of that node's flyer.
				else if (currNode.flyer.confirmCode > newNode.flyer.confirmCode) {
					currNode = currNode.left;
				}
				else {
					currNode = currNode.right;
				}
			}
			
			//This will ensure that once the node is placed, the heights of all of the new node's parents are correct.
			if (currNode.left == null || currNode.right == null) {
				currNode.height = newNode.height + 1;
				while (currNode != root) {
					if (currNode.parent.height <= currNode.height) {
						currNode.parent.height = currNode.height + 1;
					}
					currNode = currNode.parent;
				}
			}
			
			//This will check to ensure the tree is still balanced with the new node in place.
			rebalance(newNode);
			
			
		} catch (Exception E) {
			System.out.println("Error: There was an error in adding the flyer to the binary tree.");
		}
	}
}
	public Queue<Flyer> Super = new LinkedList<>();
	public Queue<Flyer> Platinum = new LinkedList<>();
	public Queue<Flyer> Gold = new LinkedList<>();
	public Queue<Flyer> Silver = new LinkedList<>();
	public binaryTree cancellations;
	
	//This method will add a flyer to the one of the queues of flight, given its status.
	public int add(String status) {
		try {
			if (!status.toLowerCase().equals("super") && !status.toLowerCase().equals("platinum") && !status.toLowerCase().equals("gold") && !status.toLowerCase().equals("silver")) {
				throw new Exception("Error: not a valid status.");
			}
			
			Flyer flyer = new Flyer(status); //This creates a new flyer.
			
			//The following if/else statements check to ensure that 
			if (flyer.status.equals("super")) {
				Super.add(flyer);
			}
			else if (flyer.status.equals("platinum")) {
				Platinum.add(flyer);
			}
			else if (flyer.status.equals("gold")) {
				Gold.add(flyer);
			}
			else if (flyer.status.equals("silver")) {
				Silver.add(flyer);
			}
			else {
				throw new Exception("Error: invalid input. Choose between 'super', 'platinum', 'gold', and 'silver'.");
			}
			
			return flyer.confirmCode; //This will return the flyer's confirmation code so that they can cancel later, if needed.
			
		} catch (Exception E) {
			System.out.println("Error: There was an error in adding the Flyer to the flight. You may have entered invalid input.");
			return 0;
		}
	}
	
	//This method will allow a user to cancel their flight request, if needed.
	public String cancel(int code) {
		try {
			if (code < 100000 || code > 999999) {
				throw new Exception("Error: code is invalid.");
			}
			Flyer flyer = new Flyer("");//This creates a new blank flyer.
			flyer.confirmCode = code; //This sets the new flyer's confirmation code to the code that the user passed to the method.
			
			//If the cancellations binary tree is null, this will initialize it by setting flyer to the root node of the tree.
			if (cancellations == null) {
				cancellations = new binaryTree(flyer);
			}
			
			//If the cancellations binary tree is already initialized, this will add the flyer as a new node to the binary tree.
			else {
				cancellations.add(flyer);
			}
			
			//This will return the confirmation string stating that your flight has been canceled.
			String cancelString = "If your code has been entered correctly, your flight has been canceled.\n";
			return cancelString;
			
			
		}catch (Exception E){
			String cancelString = "Your flight has not been canceled. You may have entered invalid input.";
			return cancelString;
		} 
	}
	
	//This will use the cancellations binary tree and the four queues to determine which flyers get first-class flight status.
	public int[] fillRequests(int k) {
		try {
			
			//Variables
			int i = 0; //This is a counter to ensure we do not place more than k passengers in seats.
			int[] firstClass = new int[k]; //This is an array that will store the confirmation codes of each passenger that was granted first-class status.
			Flyer flyer = null; //This is a blank flyer, which will be used in traversing the queues and binary trees.
			boolean canceled = false; //This boolean will determine if the flyer has canceled his flight.
			Flight.binaryTree.Node<Flyer> w = null; //This is an empty node that will be used to traverse the binary tree.
			
			//This ensures that the program will run until k flyers are seated in first class.
			while (i < k) {
				
				//The following if statements will check each queue to determine which passengers should receive first-class status.
				//This ensures that each passenger will be drawn from the queues based upon their frequent-flyer status, 
				//and then based on when they made their upgrade request.
				if (Super.peek() != null) {
					flyer = Super.remove();
				}
				else if (Platinum.peek() != null) {
					flyer = Platinum.remove();
				}
				else if (Gold.peek() != null) {
					flyer = Gold.remove();
				}
				else if (Silver.peek() != null) {
					flyer = Silver.remove();
				}
				
				//If all the queues are empty, then there are no more fliers that can be placed into first class, so the program will terminate.
				else {
					return firstClass;
				}
				
				//This will check to see if there are cancellations, and if so, will place w as the root of cancellations for traversal.
				if (cancellations != null) {
					w = cancellations.root;
				}
				
				//This will traverse the cancellations binary tree using w to determine if the flyer's confirmation code is in cancellations,
				// which would mean that they cancelled their first class upgrade request.
				while (w != null) {
					if (flyer.confirmCode == w.flyer.confirmCode) {
						canceled = true;
						break;
					}
					else if (flyer.confirmCode > w.flyer.confirmCode) {
						w = w.right;
					}
					else {
						w = w.left;
					}
				}
				
				//If their upgrade request was not canceled, their confirmation code will be added to the array of flyers.
				if (canceled == false) {
					firstClass[i] = flyer.confirmCode;
					i += 1;
				}
				//Otherwise, the program will continue without adding the flyer's confirmation code to the array, because it was cancelled.
				else {
					canceled = false;
				}
			}
		
		//Once the program finishes, it will return the array firstClass, 
		//which will contain a list of the confirmation codes of each flyer that has been granted first class status.
		return firstClass;
		
		} catch (Exception E) {
			System.out.println("Error: there was an error in filling the first class upgrade requests. You may have entered invalid input.");
			return null;
		}
	}
}
