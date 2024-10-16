package hw6_E_Tashji;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class Anagrams {
	/**
	 * @param primes: A list of the first 26 prime numbers, one for each letter in the alphabet.
	 * @param letterTable: A Map that associates each of the letters from the alphabet with each int from the primes array.
	 * @param: anagramTable: a Map that assigns each word with a hash code, and words that are anagrams will have the same hash code.
	 */
	final Integer[] primes = new Integer[] {2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101};
	Map<Character, Integer> letterTable;
	Map<Long,ArrayList<String>> anagramTable;
	
	/**
	 * The Anagrams method is a constructor for the Anagrams class. It creates letterTable and anagramTable as new HashMaps 
	 * and calls the buildLetterTable method.
	 */
	public Anagrams() {
		try {
			letterTable = new HashMap();
			anagramTable = new HashMap();
			buildLetterTable();
		} catch (Exception e) {
			System.out.println("Error: There was an error in constructing the Anagram.");
		}
	}
	
	/**
	 * The buildLetterTable method builds the letterTable HashMap by assigning each letter in the alphabet with a unique prime number from the 
	 * primes int[] array.
	 */
	private void buildLetterTable() {
		try {
			char[] alphabet = new char[] {'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'};
			for (int i = 0; i < alphabet.length; ++i) {
				letterTable.put(alphabet[i],primes[i]);
			}
		} catch (Exception e) {
			System.out.println("Error: There was an error in building the letter table.");
		}
	}
	
	/**
	 * The addWord method adds a word to its correct ArrayList within the anagram Table. 
	 */
	private void addWord(String s) {
		try {
			ArrayList<String> currList;
			if (anagramTable.containsKey(myHashCode(s))) {
				currList = anagramTable.get(myHashCode(s));
			}
			else {
				currList = new ArrayList<>();
			}
			currList.add(s);
			anagramTable.put(myHashCode(s), currList);
		} catch (Exception e) {
			System.out.println("Error: There was an error in adding this word to the ArrayList: " + s);
		}
	}
	
	/**
	 * The myHashCode method will create a HashCode from a given word using the LetterTable HashMap.
	 */
	private Long myHashCode(String s) {
		try {
			if (s.length() == 0) {
				return (long) 0;
			}
			
			Long hashCode = (long) 1;
			for (int i = 0; i < s.length(); ++i) {
				hashCode *= letterTable.get(s.charAt(i));
			}
			return hashCode;
		} catch (Exception e) {
			System.out.println("Error: There was an error in generating a hash code for this word: " + s);
			return null;
		}
	}
	
	/**
	 * The processFile method processes a file passed from Main, that is located in the project file. This then takes all words from the file and
	 * adds them to the anagramTable HashMap using the addWord method.
	 */
	private void processFile(String s) throws IOException {
		FileInputStream fstream = new FileInputStream(s);
		BufferedReader br = new BufferedReader(new InputStreamReader(fstream));
		String strLine;
		while((strLine = br.readLine()) != null) {
			this.addWord(strLine);
		}
		br.close();
	}
	
	/**
	 * The getMaxEntries() method returns an ArrayList of the entries in the anagramTable HashMap that have the most Anagrams.
	 */
	private ArrayList<Map.Entry<Long,ArrayList<String>>> getMaxEntries() {
		try {
			ArrayList<Map.Entry<Long,ArrayList<String>>> maxEntries = new ArrayList<>();
			ArrayList<String> currList = new ArrayList<>();
			ArrayList<String> maxList = new ArrayList<>();
			for (Map.Entry<Long, ArrayList<String>> entry : anagramTable.entrySet()) {
				currList = entry.getValue();
				if (currList.size() > maxList.size()) {
					maxList = currList;
					maxEntries.clear();
					maxEntries.add(entry);
				}
				else if (currList.size() == maxList.size()) {
					maxEntries.add(entry);
				}
			}
			return maxEntries;
		} catch (Exception e) {
			System.out.println("Error: There was an error in getting the the HashMap entries with the most anagrams.");
			return null;
		}
	}
	
	/**
	 * The Main Method implements the Anagrams class to retrieve the words with the most anagrams.
	 */
	public static void main(String[] args) {
		Anagrams a = new Anagrams();
		
		final long startTime = System.nanoTime();
		try {
			a.processFile("words_alpha.txt");
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		ArrayList<Map.Entry<Long, ArrayList<String>>> maxEntries = a.getMaxEntries();
		final long estimatedTime = System.nanoTime() - startTime;
		final double seconds = ((double) estimatedTime/1000000000);
		System.out.println("Time: " + seconds);
		System.out.println("List of max anagrams: " + maxEntries);
	}
}
