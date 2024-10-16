Author: Eric Tashji

I made the following changes to the client code:
1. Added a number of include statements necessary for the compiler to know which libraries to reference so that it can compile the client code into an executable.

I made the following changes to the server code:
1. Added a number of include statements necessary for the compiler to know which libraries to reference so that it can compile the server code into an executable.
2. Created a pid_t statement so that it can be used to create pids for parent (ppid) and child (pid) processes.
3. Moved the accept and addr_size statements to inside the while loop so it can accept connections from multiple clients.
4. Added an if statement that will bug test each new socket every time a client connects.
5. Added an if statement that will create a fork every time a client connects.
6. Added a while loop that will continue to run fo reach client so that both clients can continue to send messages to the server.
7. Added a kill statement that will send the SIGINT signal to the child process so that it ends once the client sends the "shutdown" message.
