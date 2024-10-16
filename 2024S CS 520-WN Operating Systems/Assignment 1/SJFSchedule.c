#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

struct node {
	char taskName[5];
	int priority;
	int cpuBurst;
	int cpuTime;
	struct node *next;
	struct node *previous;
};


int main(int args, char **arg) 
{
	FILE *reader;
	reader = fopen(arg[1], "r");
	if (reader != NULL) {
		struct node *head = NULL;
		struct node *tail = NULL;
		while (!feof(reader)) {
			char taskName[5];
			char priority[5];
			char cpuBurst[5];
			int priorityNum;
			int cpuBurstNum;
			fscanf(reader, "%s %s %s ", taskName, priority, cpuBurst);
			taskName[strlen(taskName)-1] = '\0';
			priority[strlen(priority)-1] = '\0';
			priorityNum = atoi(priority);
			cpuBurstNum = atoi(cpuBurst);
			struct node *newNode = malloc(sizeof(struct node));
			strcpy(newNode->taskName, taskName);
			newNode->priority = priorityNum;
			newNode->cpuBurst = cpuBurstNum;
			if (head == NULL) {
				head = newNode;
				tail = newNode;
			}
			else if (newNode->cpuBurst < head->cpuBurst) {
				newNode->next = head;
				head->previous = newNode;
				head = newNode;
			}
			else {
				struct node *pointer = head;
				while (pointer != NULL) {
				if (newNode->cpuBurst < pointer->cpuBurst) {
						pointer->previous->next = newNode;
						newNode->previous = pointer->previous;
						newNode->next = pointer;
						pointer->previous = newNode;
						break;
					}
					else if (pointer == tail) {
						pointer->next = newNode;
						newNode->previous = pointer;
						tail = newNode;
						break;
					}
					else {
						pointer = pointer->next;
					}
				}
			}
		}
		struct node *pointer2 = head;
		int cpuTime = 0;
		printf("\nTasks are organized on a shortest-job-first schedule:\n\n");
		while (pointer2 != NULL) {
			cpuTime += pointer2->cpuBurst;
			pointer2->cpuTime = cpuTime;
			printf("Running Task = %s, Priority: %d, CPU Burst: %d, CPU Time: %d\n", 
			pointer2->taskName, pointer2->priority, pointer2->cpuBurst, pointer2->cpuTime);
			pointer2 = pointer2->next;
		}
	}
	else printf("Error opening file.\n.");
	
	return 0;
}
