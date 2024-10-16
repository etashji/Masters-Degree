Eric Tashji

This is a summary of the ProgrammingAssignment5EricTashji program.

It begins by establishing a flag for if the signal handler is visited.

It then creates a signal handler that will alter the flag to indicate the signal handler had been visited.

The program then forks to a child process and checks to ensure the fork was successful. If it was successful, the child program executes as follows:

Prompt the user for two floating point values.
Check to ensure the floating point values will not create a divide by zero error.
Then, perform division by dividing the first value by the second.
Then check to ensure that the two floating point variables, when multiplied, will not create a floating point overflow error.
If not, multiply the the floats by one another and save the product.
Then check to ensure that the product, when multiplied by 1000000000 will not create a floating point overflow error.
If not, perform the multiplication.
Then, do the same process again, but with integer values instead.
If any calculation produces an error, the child process will send an error message to the console, send the SIGFPE signal to the parent process, and then exit the process.
If none of the calculations produce an error, the child process will send the SIGFPE signal to the parent, and then exit the process.

Meanwhile, the parent process will wait to receive the SIGFPE signal. 
Once the signal is received, it will send that signal to the signal handler, which will activate the flag.
The flag will then tell the parent process to display a message that the signal was received before exiting the program.
