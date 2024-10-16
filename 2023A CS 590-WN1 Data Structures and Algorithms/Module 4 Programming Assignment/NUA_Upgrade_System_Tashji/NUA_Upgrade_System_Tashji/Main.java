import java.util.Scanner;

public class Main {

	//This is the interface that is intended to be used with the Flight class.
	public static void main(String[] args) {
		
		//Variables
		Scanner scnr = new Scanner(System.in); //This initiates a scanner.
		Flight flight = new Flight(); //This instantiates the Flight class.
		boolean quit = false; //This is a boolean to determine if the user wants to quit the program.
		boolean validStatus;//This checks to ensure that the flight status is valid when a user creates a new flyer.
		String statusChoice; //This will record the user's flight status.
		String choice; //This will record the user's menu choice
		int code = 0; //This will store the user's confirmation code that is created when using the add method so it can be displayed to the user.
		int conCode = 0; //This will store the confirmation code the user enters for cancellation.
		String confirmString = ""; //This will be used to tell the user whether or not their request was cancelled.
		int seats = 0; //This will be used to store the number of available first-class seats.
		int[] filledRequests; //This will be used to store the confirmation codes of the users that are granted first class seating.
		boolean validCode; //This checks to ensure the confirmation code is valid.
		boolean validInt; //This checks to ensure the number of seats entered is valid.
		
		//This is the beginning of the menu.
		while (quit == false) {
			
			//These four choices determine the menu options.
			System.out.println("What would you like to do?");
			System.out.println("Press 'a' to add a first class upgrade request.");
			System.out.println("Press 'c' to cancel a first class upgrade request.");
			System.out.println("Press 'f' to fill first class upgrade requests.");
			System.out.println("Press q to quit.\n");
			
			choice = scnr.next().toLowerCase(); //This stores the user's choice.
			
			//This will add a first class upgrade request, based on the flyer's status.
			if (choice.equals("a") || choice.equals("add")) {
				validStatus = false;
				while (validStatus == false) {
					System.out.println("What is the status of this first class flyer?");
					System.out.println("Please type 's' for super, 'p' for platinum, 'g' for gold, or 'si' for silver, or press 'q' to go back.\n");
						statusChoice = scnr.next().toLowerCase();
					if (statusChoice.equals("s") || statusChoice.equals("super")) {
						code = flight.add("super");
						validStatus = true;
					}
					else if (statusChoice.equals("p") || statusChoice.equals("platinum")) {
						code = flight.add("platinum");
						validStatus = true;
					}
					else if (statusChoice.equals("g") || statusChoice.equals("gold")) {
						code = flight.add("gold");
						validStatus = true;
					}
					else if (statusChoice.equals("si") || statusChoice.equals("silver")) {
						code = flight.add("silver");
						validStatus = true;
					}
					else if (statusChoice.equals("q") || statusChoice.equals("quit")) {
						break;
					}
					else {
						System.out.println("Error: invalid choice.\n");
					}
				}
				if (validStatus) {
					System.out.println("Your confirmation code is: " + code + ".\n");
				}
			}
			
			//This will add a cancellation to the cancellation binary tree.
			else if (choice.equals("c") || choice.equals("cancel")) {
				do {
					validCode = true;
					System.out.println("What is your confirmation code?\n");
					if (scnr.hasNextInt()) {
						conCode = scnr.nextInt();
						if (conCode <= 100000 || conCode > 999999) {
							System.out.println("Error: code is invalid");
							validCode = false;
						}
					} else {
						System.out.println("Error: input is invalid " + scnr.nextLine());
						scnr.nextLine();
						validCode = false;
					}
					
				} while (validCode == false);
				confirmString = flight.cancel(conCode);
				System.out.println(confirmString);
			}
			
			//This will fill all the seats and return the confirmation codes of the passengers that are supposed to be placed in first class.
			else if(choice.equals("f") || choice.equals("fill")) {
				do {
					validInt = true;
					System.out.println("How many available seats do you have?\n");
					if (scnr.hasNextInt()) {
						seats = scnr.nextInt();
						if (seats <= 0) {
							System.out.println("Error: input is invalid. Please enter only positive integers.");
							validInt = false;
						}
					}
					else {
						System.out.println("Error: input is invalid. Please enter only positive integers.");
						scnr.nextLine();
						scnr.nextLine();
						validInt = false;
					}
				} while (validInt == false);
				filledRequests = flight.fillRequests(seats);
				System.out.println("Here is a list of the confirmation codes of flyers given first-class status:");
				for (int i = 0; i < filledRequests.length; ++i) {
					System.out.print(filledRequests[i] + " ");
				}
				System.out.println();
				System.out.println("The system is now terminating. Thank you and have a nice day.");
				quit = true;
			}
			else if (choice.equals("q") || choice.equals("quit")) {
				quit = true;
				System.out.println("Goodbye!");
			}
			else {
				System.out.println("Error: invalid input.\n");
			}
		}
	}

}
