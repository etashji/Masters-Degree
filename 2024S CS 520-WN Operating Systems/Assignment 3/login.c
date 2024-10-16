#include<stdio.h>
#include<string.h>
#include<stdlib.h>
#include<stdbool.h>
#include<time.h>

struct user {

	char username[100];
	char password[100];
	struct user *next;
};

int main(int args, char *arg[]) {
	FILE *reader;
	reader = fopen("LoginsAndPasswords.txt", "r");
	char username[100];
	char password[100];
	struct user *head = NULL;
	struct user *tail = NULL;
	int i = 0;
	while(!feof(reader)) {
		fscanf(reader, "%s %s", username, password);
		username[strlen(username) - 1] = '\0';
		struct user *user = malloc(sizeof(struct user));
		strcpy(user->username, username);
		strcpy(user->password, password);
		if (head == NULL) {
			head = user;
			tail = user;
		}
		else {
			tail->next = user;
			tail = user;
		}
	}
	fclose(reader);
	char loginUsername[100];
	char loginPassword[100];
	int counter = 0;
	struct user *pointer;
	time_t current;
	FILE *writer;
	writer = fopen("signIn.txt", "w");
	while (counter < 4) {

		if (counter == 3) {
			printf("Too many failed attempts. Your account has been locked for 1 hour.");
			fclose(writer);
			return 0;
		}
		printf("Please enter your username: ");
		fgets(loginUsername, sizeof(loginUsername), stdin);
		printf("Please enter your password: ");
		fgets(loginPassword, sizeof(loginPassword), stdin);
		if (strlen(loginUsername) > 0 && strlen(loginPassword) > 0) {
			loginUsername[strlen(loginUsername) - 1] = '\0';
			loginPassword[strlen(loginPassword) - 1] = '\0';
		}
		pointer = head;
		while (pointer != NULL) {
			if (strcmp(pointer->username, loginUsername) == 0 && strcmp(pointer->password, loginPassword) == 0) {
				printf("Username and password found. You are logged in.\n");
				time(&current);
				fprintf(writer, "%s: %s", loginUsername, ctime(&current)); 
				fclose(writer);
				return 0;
			}
			pointer = pointer->next;
		}
		printf("Username and/or password is incorrect.\n");
		time(&current);
		fprintf(writer, "%s: %s", loginUsername, ctime(&current));
		counter = counter + 1;
	}
	fclose(writer);
	return 0;
}
