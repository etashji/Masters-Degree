#include<sys/types.h>
#include<signal.h>
#include<stdio.h>
#include<unistd.h>
#include<stdlib.h>
#include<float.h>
#include<limits.h>

//Code Author: Eric Tashji

static int handled = 0; //An into to determine if SIGFPD has been sent.

//The signal handler
void handler(int signal) {
	handled = 1;
}

int main() {

	//The pid for the child process.
	pid_t pid; 
	
	//Creating the child process.
	pid = fork(); 
	
	//Check if the fork failed.
	if (pid == -1) {
		printf("Fork failed.");
		exit(1);
	}
	
	//If it didn't fail...
	else if (pid == 0) {
		
		//The two floats that the user has to provide.
		float fnum1;
		float fnum2;
		
		//Prompt the user for the two floats.
		printf("What is your first float number?\n");
		scanf("%f", &fnum1);
		printf("What is your second float number?\n");
		scanf("%f", &fnum2);
		
		//Check if there will be a divide by zero error
		if (fnum2 == 0) {
			//If so, display the message,
			printf("Floating point divide by zero error.\n");
			
			//send the signal to the parent process,
			kill(getppid(), SIGFPE);
			
			//and exit the function.
			exit(0);
		}
		
		//Else, find the quotient of the two floats and return.
		else {
			float fquotient = fnum1 / fnum2;
			printf("Quotient of fnum1 & fnum2: %f\n", fquotient);
		}
		
		//Chedk for a floating point overflow error
		if (fnum1 > FLT_MAX / fnum2) {
		
			//If so, display the message, 
			printf("Floating point overflow error.\n");
			
			//send the signal to the parent process,
			kill(getppid(), SIGFPE);
			
			//and exit the function.
			exit(0);
		}
		
		//Otherwise...
		else {
			
			//Get the initial product
			float fproduct = fnum1 * fnum2;
			
			//Check for float overflow if product * 1000000000.
			if (fproduct > FLT_MAX / 1000000000) {
				
				//If so, display the message,
				printf("Floating point overflow error.\n");
				
				//send the signal to the parent process,
				kill(getppid(), SIGFPE);
				
				//and exit the function.
				exit(0);
			}
			
			//Otherwise, perform the multiplication.
			else {
				float fbigProduct = fproduct * 1000000000;
			}
		}
		
		//The two integers to be received from the user.
		int inum1;
		int inum2;
		
		//Prompt the user for the two integers.
		printf("What is your first integer number?\n");
		scanf("%d", &inum1);
		printf("What is your second integer number?\n");
		scanf("%d", &inum2);
		
		//Check for integer divide by zero error.
		if (inum2 == 0) {
		
			//If so, display the message, 
			printf("Integer divide by zero error.\n");
			
			//send the signal to the parent.
			kill(getppid(), SIGFPE);
			
			//and exit the function.
			exit(0);
		}
		
		//Otherwise, perform the division and display the result.
		else {
			float iquotient = inum1 / inum2;
			printf("Quotient of inum1 & inum2: %f\n", iquotient);
		}
		
		//Check for integer overflow when doing the initial product.
		if (inum1 > INT_MAX / inum2) {
		
			//If so, display the message,
			printf("Integer overflow error.\n");
			
			//send the signal to the parent,
			kill(getppid(), SIGFPE);
			
			//and exit the function.
			exit(0);
		}
		
		//Otherwise, find the product of the two integers.
		else {
			int iproduct = inum1 * inum2;
			
			//Then, check for integer overflow when product * 1000000000.
			if (iproduct > INT_MAX / 1000000000) {
			
				//If so, display the message, 
				printf("Integer overflow error.\n");
				
				//send the signal to the parent,
				kill(getppid(), SIGFPE);
				
				//and exit the function.
				exit(0);
			}
			
			//Otherwise, multiply product * 1000000000.
			else {
				int ibigProduct = iproduct * 1000000000;
			}
		}
		
		//If none of the errors occur, send the signal to the parent,
		kill(getppid(), SIGFPE);
		
		//and exit the program.
		exit(0);
	}
	
	//This is to catch the signal.
	signal(SIGFPE, handler);
	
	//This ensures the parent process waits to catch the signal.
	pause();
	
	//If it has caught and handled the signal, display the message.
	if (handled == 1) {
		printf("Signal recieved. Program exiting.\n");
	}
	
	//Exit the parent process.
	exit(0);
}

