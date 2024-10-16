package hw3_E_Tashji;

import java.util.ArrayList;
import java.util.LinkedList;

public class IDLList<E> {
	
	//Code Author: Eric Tashji
	
	//Node inner class
	private class Node<E> {
		E data;
		Node<E> next;
		Node<E> previous;
		
		//Constructor for creating a node when you only have the data itself.
		Node(E elem) {
			try {
				this.data = elem;
			} catch (Exception e) {
				System.out.println("Error: Something went wrong in creating the node.");
			}
		}
		
		//Constructor for creating a node when you have the data and the next and previous nodes.
		Node(E elem, Node<E> prev, Node<E> next) {
			try {
				this.data = elem;
				this.next = next;
				this.previous = prev;
			} catch (Exception e) {
				System.out.println("Error: Something went wrong in creating the node.");
			}
		}
	}
	
	private Node<E> head;
	private Node<E> tail;
	private int size;
	private ArrayList<Node<E>> indices;
	
	//Constructor for initializing the linked list.
	public IDLList() {
		try {
			head = null;
			tail = null;
			size = 0;
			indices = new ArrayList<Node<E>>();
		} catch (Exception e) {
			System.out.println("Error: Something went wrong in creating the LinkedList.");
		}
		
	}
	
	//Method to add a node to the Linked List at a specific index
	public boolean add(int index, E elem) {
		try {
			if (index == 0) {
				add(elem);
				return true;
			}
			else if (index == size) {
				append(elem);
				return true;
			}
			else {
				Node<E> newNode = new Node<E>(elem, indices.get(index - 1), indices.get(index));
				indices.add(index, newNode);
				++size;
				if ((index - 1) == 0) {
					head.next = newNode;
				}
				if ((index + 1) == (size - 1)) {
					tail.previous = newNode;
				}
				return true;
			}
		} catch (Exception e) {
			System.out.println("Error: Something went wrong in inserting your Node at the given index.");
			System.out.println("Please be sure you are referencing a valid index.");
			return false;
		}
		
	}
	
	//Method to add a node to the Linked List at the Head.
	public boolean add(E elem) {
		try {
			Node<E> newNode = new Node<E>(elem);
			if (head == null) {
				head = tail = newNode;
				head.previous = null;
				tail.next = null;
				indices.add(0, newNode);
				++size;
				return true;
			}
			else {
				newNode.next = head;
				head.previous = newNode;
				head = newNode;
				indices.add(0, newNode);
				++size;
				return true;
			}
		} catch (Exception e) {
			System.out.println("Error: Something went wrong in inserting your Node at the Head.");
			return false;
		}
	}
	
	//Method to add a node to the Linked List at the Tail.
	public boolean append(E elem) {
		try {
			Node<E> newNode = new Node<E>(elem);
			if (head == null) {
				head = tail = newNode;
				head.previous = null;
				tail.next = null;
				indices.add(0, newNode);
				++size;
				return true;
			} 
			else {
				tail.next = newNode;
				newNode.previous = tail;
				tail = newNode;
				indices.add(size, newNode);
				++size;
				return true;
			}
		} catch (Exception e) {
			System.out.println("Error: Something went wrong in inserting your Node at the Tail.");
			return false;
		}
		
	}
	
	//Method to find the data in a node at a specific index.
	public E get(int index) {
		try {
			Node<E> getNode = indices.get(index);
			return getNode.data;
		} catch (Exception e) {
			System.out.println("Error: Something went wrong in getting the data from the Node at your given index.");
			System.out.println("Please be sure you are referencing a valid index.");
			return null;
		}
		
	}
	
	//Method to find the data in the Head Node.
	public E getHead() {
		try {
			if (size == 0) {
				return null;
			} else {
				return head.data;
			}
		} catch (Exception e) {
			System.out.println("Error: Something went wrong in getting the data from the Head Node.");
			return null;
		}

	}
	
	//Method to find the data in the Tail Node.
	public E getLast() {
		try {
			if (size == 0) {
				return null;
			}
			else {
				return tail.data;
			}
		} catch (Exception e) {
			System.out.println("Error: Something went wrong in getting the data from the Tail Node.");
			return null;
		}
	}
	
	//Method to find the size.
	public int size() {
		try {
			return size;
		} catch (Exception e) {
			System.out.println("Error: Something went wrong in getting the size.");
			return -1;
		}
	}
	
	//Method to remove the Head Node.
	public E remove() {
		try {
			Node<E> headNode = head;
			head = head.next;
			indices.remove(0);
			--size;
			if (size == 0) {
				tail = null;
			}
			return headNode.data;
		} catch (Exception e) {
			System.out.println("Error: Something went wrong in removing the Head Node.");
			return null;
		}
		
	}
	
	//Method to remove the Tail Node.
	public E removeLast() {
		try {
			Node<E> tailNode = tail;
			tail = tail.previous;
			indices.remove(size - 1);
			--size;
			if (size == 0) {
				head = null;
			}
			return tailNode.data;
		} catch (Exception e) {
			System.out.println("Error: Something went wrong in removing the Tail Node.");
			return null;
		}
		
	}
	
	//Method to remove a Node at a given index.
	public E removeAt(int index) {
		try {
			Node<E> currNode = indices.get(index); 
			if (index == 0) {
				head = head.next;
			}
			else if (index == (size - 1)) {
				tail = tail.previous;
			}
			else if ((index + 1) == (size - 1)) {
				tail.previous = currNode.previous;
			}
			else if ((index - 1) == (0)) {
				head.next = currNode.next;
			}
			else {
				currNode.next.previous = currNode.previous;
				currNode.previous.next = currNode.next;
			}
			indices.remove(index);
			--size;
			if (size == 0) {
				head = null;
				tail = null;
			}
			return currNode.data;
		} catch (Exception e) {
			System.out.println("Error: Something went wrong in removing the Node at your given index.");
			System.out.println("Please be sure you are entering a valid index.");
			return null;
		}
	}
	
	//Method to search the indices for a Node with a given element and remove it.
	public boolean remove(E elem) {
		try {
			for (int i = 0; i < size; ++i) {
				if (indices.get(i).data == elem) {
					removeAt(i);
					return true;
				}
			}
			return false;
		} catch (Exception e) {
			System.out.println("Error: Something went wrong in removing the Node with the given value.");
			return false;
		}
		
	}
	
	//Method to turn the LinkedList into a string.
	public String toString() {
		try {
			String IDLString = "";
			for (int i = 0; i < size; ++i) {
				IDLString += indices.get(i).data.toString();
				IDLString += " ";
			}
			return IDLString;
		} catch (Exception e) {
			System.out.println("Error: Something went wrong in converting the Linked List to a String.");
			return "";
		}
		
	}
}
