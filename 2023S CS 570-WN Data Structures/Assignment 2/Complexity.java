package hw2_E_Tashji;

import java.util.InputMismatchException;

public class Complexity {
	
	//Code Author: Eric Tashji
	
	//A method with a runtime of O(N).
	public static void method0(int n) {
		try {
			if (n <= 0) {
				throw new IllegalArgumentException();
			}
			int counter = 0;
			for (int i = 0; i < n; ++i) {
				counter++;
				System.out.println("Operation " + counter);
			}
		}
		catch (Exception e) {
			System.out.println("Error: Please ensure you are entering only positive integers greater than 0.");
		} 
	}
	
	//A method with a runtime of O(N^2).
	public static void method1(int n) {
		try {
			if (n <= 0) {
				throw new IllegalArgumentException();
			}
			int counter = 0;
			for (int i = 0; i < n; i++) {
				for (int j = 0; j < n; j++) {
					counter++;
					System.out.println("Operation " + counter);
				}
			}
		} catch (Exception e) {
			System.out.println("Error: Please ensure you are entering only positive integers greater than 0.");
		}
	}
	
	//A method with a runtime of O(N^3).
	public static void method2(int n) {
		try {
			if (n <= 0) {
				throw new IllegalArgumentException();
			}
			int counter = 0;
			for(int i = 0; i < n; ++i) {
				for (int j = 0; j < n; ++j) {
					for (int k = 0; k < n; ++k) {
						counter++;
						System.out.println("Operation " + counter);
					}
				}
			}
		} catch (Exception e) {
			System.out.println("Error: Please ensure you are entering only positive integers greater than 0.");
		}
	}
	
	//A method with a runtime of O(log2(N)).
	public static void method3(int n) {
		try {
			if (n <= 1) {
				throw new IllegalArgumentException();
			}
			int counter = 0;
			for (int i = 1; i < n; i = i * 2) {
				counter++;
				System.out.println("Operation " + counter);
			}
		} catch(Exception e) {
			System.out.println("Error: Please ensure you are entering only positive integers greater than 1.");
		}
	}
	
	//A method with a runtime of O(N(log2(N)).
	public static void method4(int n) {
		try {
			if (n <= 1) {
				throw new IllegalArgumentException();
			}
			int counter = 0;
			for (int i = 0; i < n; ++i) {
				for (int j = 1; j < n; j = j * 2) {
					counter++;
					System.out.println("Operation " + counter);
				}
			}
		} catch (Exception e) {
			System.out.println("Error: Please ensure you are entering only positive integers greater than 1.");
		}
	}
	
	//A method with a runtime of O(log2(log(N))).
	public static void method5(int n) {
		try {
			if (n <= 2) {
				throw new IllegalArgumentException();
			}
		int counter = 0;
			for (int i = 2; i < n; i = i * i) {
				counter++;
				System.out.println("Operation " + counter);
			}
		} catch(Exception e) {
			System.out.println("Error: Please ensure you are entering only positive integers greater than 2.");
		}
	}
	
	//Extra Credit: A method with a runtime of O(2^n).
	public static int method6(int n) {
		try {
			if (n < 0) {
				throw new IllegalArgumentException();
			}
			double limit = Math.pow(2, n);
			int limiter = (int) limit;
			int counter = 0;
			while (counter < limiter) {
				counter++;
			}
			return counter;
		} catch (Exception e) {
			System.out.println("Error: Please ensure you are entering only positive integers.");
			return 0;
		}
	}
}
