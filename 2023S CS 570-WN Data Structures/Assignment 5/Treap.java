package hw5_E_Tashji;

import java.util.Random;
import java.util.Stack;
/**
 * @author Eric Tashji
 */

public class Treap<E extends Comparable<E>> {
	private static class Node<E extends Comparable<E>> {
		/**
		 * @param data: the Node's data.
		 * @param priority: the Node's priority.
		 * @param left: the Node's left node.
		 * @param right: the Node's right node.
		 */
		public E data;
		public int priority;
		public Node<E> left;
		public Node<E> right;
		
		/**
		 * Creates a new node.
		 */
		public Node(E data, int priority) {
			try {
				if (data == null) {
					throw new NullPointerException("Error: You cannot create a new node without data.");
				}
				this.data = data;
				this.priority = priority;
				this.left = null;
				this.right = null;
			}
			catch (Exception e) {
				System.out.println("Error: There was an error in creating a new node.");
			}
		}
		
		/**
		 * Rotates a node to the right.
		 */
		public Node<E> rotateRight() {
			try {
				Node<E> newNode = new Node<E>(this.data, this.priority);
				if (this.left != null) {
					if (this.right != null) {
						newNode.right = this.right;
					}
					if (this.left.right != null) {
						newNode.left = this.left.right;
					}
					this.priority = this.left.priority;
					this.data = this.left.data;
					this.right = newNode;
					if (this.left.left != null) {
						this.left = this.left.left;
					}
					else {
						this.left = null;
					}
					
				}
				return newNode;
			}
			catch (Exception e) {
				System.out.println("Error: There was an error in rotating the node to the right.");
				return null;
			}
		}
		
		/**
		 * Rotates a node to the left.
		 */
		public Node<E> rotateLeft() {
			try {
				Node<E> newNode = new Node<E>(this.data, this.priority);
				if (this.right != null) {
					if (this.left != null) {
						newNode.left = this.left;
					}
					if (this.right.left != null) {
						newNode.right = this.right.left;
					}
					this.priority = this.right.priority;
					this.data = this.right.data;
					this.left = newNode;
					if(this.right.right != null) {
						this.right = this.right.right;
					}
					else {
						this.right = null;
					}
					
				}
				return newNode;
			}
			catch(Exception E) {
				System.out.println("Error: There was an error in rotating the node to the Left.");
				return null;
			}
		}
		
		/**
		 * Converts a node's data to a string.
		 */
		public String toString() {
			try {
				return data.toString();
			}
			catch (Exception e) {
				String errorString = "Error: There was an error in converting the node's data into a string.";
				return errorString;
			}

		}
	}
	
	/**
	 * @param priorityGenerator: generates a random priority for a new Node.
	 * @param root: the Treap's root Node.
	 */
	private Random priorityGenerator;
	private Node<E> root;
	
	/**
	 * Constructor for a new Treap with a random priority generator seed.
	 */
	public Treap() {
		try {
			priorityGenerator = new Random();
			root = null;
		}
		catch (Exception e) {
			System.out.println("Error: There was an error in creating a new Treap.");
		}
	}
	
	/**
	 * Constructor for a new Treap with a specified priority generator seed.
	 */
	public Treap(long seed) {
		try {
			priorityGenerator = new Random(seed);
			root = null;
		}
		catch (Exception e) {
			System.out.println("Error: There was an error in creating a new Treap with the seed provided.");
		}
	}
	
	/**
	 * An add method for a specified key, but not a specified priority.
	 */
	boolean add(E key) {
		try {
			int priority = priorityGenerator.nextInt();
			return add(key, priority);
		}
		catch (Exception e) {
			System.out.println("Error: There was an error in adding the node to the Treap without the key given.");
			return false;
		}
	}
	
	/**
	 * An add method for a specified key and priority.
	 */
	boolean add (E key, int priority) {
		try {
			Stack<Node<E>> trace = new Stack<>();
			Node<E> newNode = root;
			if (root == null) {
			root = new Node<E>(key, priority);
			return true;
			}
			while (newNode != null) {
				trace.push(newNode);
				if (newNode.data.compareTo(key) == 0 || newNode.priority == priority) {
					return false;
				}
				else if (newNode.data.compareTo(key) < 0) {
					newNode = newNode.right;
				}
				else {
					newNode = newNode.left;
				}
			}
			newNode = trace.peek();
			if (newNode.data.compareTo(key) < 0) {
				Node<E> newNode1 = new Node<E>(key, priority);
				newNode.right = newNode1;
				trace.push(newNode1);
				
			}
			else {
				Node<E> newNode1 = new Node<E>(key, priority);
				newNode.left = newNode1;
				trace.push(newNode1);
			}
			Node<E> newNode1 = trace.pop();
			return reheap(trace, newNode1);
		}
		catch (Exception e) {
			System.out.println("Error: There was an error in adding the Node to the Treap, with a key and priority.");
			return false;
		}
		
	}
	
	/**
	 * A private reheap method that will reorganize the Treap to take priority into account.
	 */
	private boolean reheap(Stack<Node<E>> trace, Node<E> newNode1) {
		try {
			Node<E> newNode = trace.pop();
			while (newNode != null && newNode.priority < newNode1.priority) {
				if (newNode1.data.compareTo(newNode.data) == 0 || newNode1.priority == newNode.priority) {
					return false;
				}
				if (newNode1.data.compareTo(newNode.data) < 0) {
					newNode.rotateRight();
					if (trace.isEmpty()) {
						return true;
					}
					newNode = trace.pop();
				}
				else {
					newNode.rotateLeft();
					if (trace.isEmpty()) {
						return true;
					}
					newNode = trace.pop();
				}
			}
		}
		catch (Exception e) {
			System.out.println("Error: There was an error in reheaping the Treap.");
		}
		return true;
	}
	
	/**
	 * A delete method. It will search for the specified key, reorganize the tree to make the Node
	 * a leaf node, and then delete the node.
	 */
	boolean delete(E key) {
		try {
			Node<E> newNode = root;
			Stack<Node<E>> trace = new Stack<Node<E>>();
			boolean removed = false;
			while(newNode != null) {
				if (newNode.data.compareTo(key) == 0) {
					while(newNode.right != null || newNode.left != null) {
						if (newNode.left != null && newNode.right != null) {
							if (newNode.left.priority > newNode.right.priority) {
								newNode.rotateRight();
								trace.push(newNode);
								newNode = newNode.right;
							}
							else {
								newNode.rotateLeft();
								trace.push(newNode);
								newNode = newNode.left;
							}
						}
						else if (newNode.left != null) {
							newNode.rotateRight();
							trace.push(newNode);
							newNode = newNode.right;
						}
						else {
							newNode.rotateLeft();
							trace.push(newNode);
							newNode = newNode.left;
						}
					}
					if (trace.isEmpty() == false) {
						Node<E> parNode = trace.pop();
						if (parNode.left == newNode) {
							parNode.left = null;
						}
						else {
							parNode.right = null;
						}
					}
					else {
						root = null;
					}
					removed = true;
					newNode = null;
				}
				else if (newNode.data.compareTo(key) < 0) {
					trace.push(newNode);
					newNode = newNode.right;
				}
				else {
					trace.push(newNode);
					newNode = newNode.left;
				}
			}
			if (removed == true) {
				return true;
			}
			else {
				return false;
			}
		}
		catch (Exception e) {
			System.out.println("Error: There was an error in deleting the requested Node.");
			return false;
		}
	}

	/**
	 * This private method is used with the public find method. It will search through the Treap and
	 * return true if it can find the Node with the key is found. Else, it will return false.
	 */
	private boolean find(Node<E> root, E key) {
		try {
			if (root == null) {
				return false;
			}
			Node<E> newNode = root;
			while (newNode != null) {
				if (newNode.data.compareTo(key) == 0) {
					return true;
				}
				else if (newNode.data.compareTo(key) < 0) {
					newNode = newNode.right;
				}
				else {
					newNode = newNode.left;
				}
			}
			return false;
		}
		catch (Exception e) {
			System.out.println("Error: There was an error in searching for your Node, given the root and key.");
			return false;
		}
	}
		
	
	/**
	 * This public method uses its private version to find the given key.
	 */
	public boolean find(E key) {
		try {
			return find(root, key);
		}
		catch (Exception e) {
			System.out.println("Error: There was an error in searching for your Node, given the key.");
			return false;
		}

	}
	
	/**
	 * This converts the entire Treap to a string, using the Node clas's string method, and the preOrderTraversal method.
	 */
	public String toString() {
		try {
			StringBuilder b = new StringBuilder();
			TreapTraverse(root, b, 1);
			return b.toString();
		}
		catch (Exception e) {
			String errorString = "Error: There was an error in converting your Treap to a string.";
			return errorString;
		}
	}
	
	/**
	 * This is a method to traverse the Treap in order to turn it into a string.
	 */
	private void TreapTraverse(Node<E> current, StringBuilder b, int d) {
		try {
			for (int i = 0; i <= d; i++) {
				b.append(" ");
			}
			if (current == null) {
				b.append("null\n");
			}
			else{
				b.append("(key = " + current.toString() + ", priority = " + current.priority + ")\n");
				TreapTraverse(current.left, b, d+1);
				TreapTraverse(current.right, b, d+1);
			}
		}
		catch (Exception e) {
			System.out.println("Error: There was an error in traversing your Treap while converting it into a String.");
		}
	}
	
}
