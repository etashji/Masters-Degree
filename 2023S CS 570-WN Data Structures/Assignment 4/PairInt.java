package Maze;

//PairInt class
public class PairInt {

	//Variables
	private int x;
	private int y;
	
	//PairInt constructor
	public PairInt(int x, int y) {
		try {
			this.x = x;
			this.y = y;
		} catch (Exception e) {
			System.out.println("Error: There was an error in implementing the PairInt constructor.");
		}
		
	}
	
	//Method to return PairInt's x value.
	public int getX() {
		try {
			return x;
		} catch (Exception e) {
			System.out.println("Error: There was an error in implementing the getX method of the PairInt class.");
			return -1;
		}

	}
	
	//Method to return PairInt's y value.
	public int getY() {
		try {
			return y;
		} catch (Exception e) {
			System.out.println("Error: There was an error in implementing the getY method of the PairInt class.");
			return -1;
		}

	}
	
	//Method to set ParInt's x value.
	public void setX(int x) {
		try {
			this.x = x;
		} catch (Exception e) {
			System.out.println("Error: There was an error in implementing the setX method of the PairInt class.");
		}

	}
	
	//Method to set ParInt's y value.
	public void setY (int y) {
		try {
			this.y = y;
		} catch (Exception e) {
			System.out.println("Error: There was an error in implementing the SetY method of the PairInt class.");
		}
	}
	
	//Method to see if two PairInts are equal.
	public boolean equals(Object p) {
		try {
			if (p.toString() == this.toString()) {		
				return true;
			}
			else {
				return false;
			}
		} catch (Exception e) {
			System.out.println("Error: There was an error in implementing the equals method of the PairInt class.");
			return false;
		}
		
	}
	
	//Method to turn PairInt into a string.
	public String toString() {
		try {
			String string = "(" + x + ", " + y + ")";
			return string;
		} catch (Exception e) {
			System.out.println("Error: There was an error in implementing the toString method of the PairInt class.");
			return null;
		}
	}
	
	//Method to copy a PairInt.
	public PairInt copy() {
		try {
			PairInt copy = new PairInt(x,y);
			return copy;
		} catch (Exception e) {
			System.out.println("Error: There was an error in implementing the PairInt copy method in the PairInt class.");
			return null;
		}

	}
}
