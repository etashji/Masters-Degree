package hw1ETashji;

public class BinaryNumber {
	
	//Code Author: Eric Tashji
	
	//Data integer array which will store the elements of the array.
	private int[] data;
	
	//Boolean that will determine whether or not there is an overflow.
	boolean overflow = false;
	
	//Constructor that will create a binary number of length: length, consisting entirely of 0s.
	public BinaryNumber(int length) {
		try {
			if (length < 1) {
				throw new IllegalArgumentException("Error: please input only positive integers (not 0).");
			}
			else {
				data = new int[length];
				for (int i = 0; i < length; ++i) {
					data[i] = 0;
				}
			}
		} catch(Exception e) {
			System.out.println("Something went wrong. Ensure you are inputting a positive integer (Greater than 0).");
		}
	}
	
	//Constructor that will create a binary number out of a string. Will return an error if character other than 1 or 0 are present.
	public BinaryNumber(String number) {
		try {
			for (int i = 0; i < number.length(); ++i) {
				if (Character.getNumericValue(number.charAt(i)) != 1 && Character.getNumericValue(number.charAt(i)) != 0) {
					throw new IllegalArgumentException("Error: Your input must consist only of 1s and 0s. Your number was not initialized.");
				}
			}
			data = new int[number.length()];
			for (int i = 0; i < data.length; ++i) {
				data[i] = Character.getNumericValue(number.charAt(i));
			}
		} catch(Exception e) {
			System.out.println("Something went wrong. Please ensure you are inputting only 1s and 0s.");
		}
	}
	
	//Will return the length of a binary number.
	public int getLength() {
		try {
			if (data == null) {
				throw new NullPointerException("Error: Your binary number was not properly initialized.");
			}
			else {
				return data.length;
			}
		} catch(Exception e) {
			System.out.println("Something went wrong. Your binary number may not have been properly initialized.");
			return -1;
		}
	}
	
	//Will return the digit at a specific index. Will return an error if the index is out of bounds.
	public int getDigit(int index) {
		try {
			if (data == null) {
				throw new NullPointerException("Error: Your binary number was not properly intialized.");
			}
			else if (index < 0 || index >= data.length) {
				System.out.println("Error: Your index is out of bounds of your binary number.");
				return -1;
			}
			else {
				int digit = data[index];
				return digit;
			}
		} catch(Exception e) {
			System.out.println("Something went wrong. Your binary number may not have been properly initialized or your index may be out of bounds.");
			return -1;
		}
	}
	
	//Will shift the binary number to the right amount times, with 0s added. Will return an error message if the amount is less than 1.
	public void shiftR(int amount) {
		try {
			if (data == null) {
				throw new NullPointerException("Error: Your binary number was not properly initialized.");
			}
			else if (amount < 1) {
				throw new IllegalArgumentException("Error: Your amount to shift cannot be less than 1.");
			}
			else {
				int[] newData = new int[data.length + amount];
				int length = data.length;
				for (int i = 0; i < amount; ++i) {
					newData[i] = 0;
				}
				for (int i = amount; i < newData.length; ++i) {
					newData[i] = data[i - amount];
				}
				data = new int[length + amount];
				for (int i = 0; i < data.length; ++i) {
					data[i] = newData[i];
				}
				return;
			}
		} catch (Exception e) {
			System.out.println("Something went wrong. Your number may not have been initialized, or you may have entered a negative number to shift.");
		}
	}
	
	//Will add two binary numbers. Will return an error message if the numbers are not equal lengths.
	public void add(BinaryNumber aBinaryNumber) {
		try {
			if (data == null) {
				throw new NullPointerException("Error: Your first binary number was not properly initialized.");
			}
			else if (aBinaryNumber.getLength() == 0) {
				throw new NullPointerException("Error: Your second binary number was not properly initialized.");
			}
			else if (data.length != aBinaryNumber.getLength()) {
				System.out.println("Error: The lengths of the two binary numbers are not equal.");
				return;
			}
			else {
				int[] carriedDigits = new int[data.length + 1];
				int[] answer = new int[data.length];
				for (int i = 0; i < data.length; ++i) {
					int addition = carriedDigits[i] + data[i] + aBinaryNumber.getDigit(i);
					if (addition == 3) {
						carriedDigits[i + 1] = 1;
						answer[i] = 1;
					}
					else if (addition == 2) {
						carriedDigits[i + 1] = 1;
						answer[i] = 0;
					}
					else if(addition == 1) {
						carriedDigits[i + 1] = 0;
						answer[i] = 1;
					}
					else if(addition == 0) {
						carriedDigits[i + 1] = 0;
						answer[i] = 0;
					}
				}
				if (carriedDigits[data.length] == 1) {
					overflow = true;
					return;
				}
				else {
					for (int i = 0; i < data.length; ++i) {
						data[i] = answer[i];
					}
					return;
				}
			}
		} catch(Exception e) {
			System.out.println("Something went wrong. One of your binary numbers may not have been properly initialized, or they may not be equal.");
		}
	}

	//Will turn the binary number into a string and return it to the user as a string. If the number is an overflow, it will return "Overflow".
	public String toString() {
		try {
			if (overflow == true) {
				return "Overflow";
				
			}
			else {
				String binaryString = "";
				for (int i = 0; i < data.length; ++i) {
					String number = Integer.toString(data[i]);
					binaryString = binaryString + number;
				}
				return binaryString;
			}
		} catch (Exception e) {
			String errorString = "Something went wrong. Your binary number may not have been properly initialized.";
			return errorString;
		}
	}
	
	//Will return the binary number in decimal form.
		public int toDecimal() {
			try {
				if (data == null) {
					throw new NullPointerException("Error: Your number was not properly initialized.");
				}
				else {
					int answer = 0;
					for (int i = 0; i < data.length; ++i) {
						answer += (data[i] * Math.pow(2, i));
					}
					return answer;
				}
			} catch (Exception e) {
				System.out.println("Something went wrong. Your binary number may not have been initialized.");
				return 0;
			}
		}
	
	//Can be used to clear the overflow.
	public void clearOverflow() {
		overflow = false;
	}
}
