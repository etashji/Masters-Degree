#include<stdio.h>
#include<stdlib.h>
#include<signal.h>
#include<string.h>
#include<stdbool.h>

void handler(int);

int main(int args, char *arg[]) {
	//Check for correct input for initial cylinder.
	signal(SIGSEGV, handler);
	int maxCylinder = 4999;
	int minCylinder = 0;
	char *num = arg[1];
	char zero = '0';
	if (*num != '0') {
		if (atoi(num) == 0) {
			printf("Error: You have entered a non-integer as an initial cylinder.\n");
			return -1;
		}
	}
	float flo = atof(num);
	int initial = (int)flo;
	if (flo != initial) {
		printf("Error: You have entered a non-integer as an initial cylinder.\n");
		return -1;
	}
	if (initial < 0 || initial > 4999) {
		printf("Error: Your initial cylinder is out of bounds of the available cylinders.\n");
		return -1;
	}
	printf("Initial cylinder: %d.\n\n", initial);
	//Read in input from "request.txt".
	FILE *request = fopen("request.txt", "r");
	int length = 1000;
	char numString[5];
	int nums[length];
	int i = 0;
	int number;
	while(fscanf(request, "%s", numString) == 1) {
		if (numString[strlen(numString) - 1] == ',') {
			numString[strlen(numString) -1] = '\0';
		}
		nums[i] = atoi(numString);
		if (nums[i] < 0 || nums[i] > 4999) {
			printf("Error: The requested cylinder index (%d) is out of bounds.", nums[i]);
		}
		++i;
	}
	fclose(request);

	
	//SSTF scheduling
	printf("SSTF Scheduling:\n");
	int unusedNums[i];
	for (int j = 0; j < i; ++j) {
		unusedNums[j] = nums[j];
	}
	int closestNum;
	int lowestDistance = 5000;
	int currentNum = initial;
	int totalDistance = 0;
	int counter = i;
	while (counter > 0) {
		for (int j = 0; j < counter; ++j) {
			if (unusedNums[j] > currentNum && unusedNums[j] - currentNum < lowestDistance) {
				closestNum = unusedNums[j];
				lowestDistance = unusedNums[j] - currentNum;
			}
			else if (currentNum >= unusedNums[j] && currentNum - unusedNums[j] < lowestDistance) {
				closestNum = unusedNums[j];
				lowestDistance = currentNum - unusedNums[j];
			}
		}
		currentNum = closestNum;
		printf("Servicing %d\n", currentNum);
		totalDistance += lowestDistance;
		lowestDistance = 5000;
		for (int j = 0; j < counter; ++j) {
			if (unusedNums[j] == currentNum) {
				unusedNums[j] = unusedNums[counter - 1];
			}
		}
		counter--;
	}
	printf("Total Distance: %d\n\n", totalDistance);
	
	//FCFS Scheduling
	printf("FCFS Scheduling:\n");
	for (int j = 0; j < i; ++j) {
		unusedNums[j] = nums[j];
	}
	currentNum = initial;
	totalDistance = 0;
	for (int j = 0; j < i; ++j) {
		if (currentNum > unusedNums[j]) {
			totalDistance += currentNum - unusedNums[j];
		}
		else {
			totalDistance += unusedNums[j] - currentNum;
		}
		currentNum = unusedNums[j];
		printf("Servicing %d\n", unusedNums[j]);
	}
	printf("Total Distance: %d\n\n", totalDistance);
	
	//SCAN Scheduling
	printf("SCAN Scheduling:\n");
	for (int j = 0; j < i; ++j) {
		unusedNums[j] = nums[j];
	}
	currentNum = initial;
	totalDistance = 0;
	lowestDistance = 5000;
	int upCounter = 0;
	int downCounter = 0;
	bool up;
	for (int j = 0; j < i; ++j) {
		if (unusedNums[j] > currentNum && unusedNums[j] - currentNum < lowestDistance) {
			closestNum = unusedNums[j];
			lowestDistance = unusedNums[j] - currentNum;
			}
		else if (currentNum >= unusedNums[j] && currentNum - unusedNums[j] < lowestDistance) {
			closestNum = unusedNums[j];
			lowestDistance = currentNum - unusedNums[j];
		}
	}
	if (closestNum > currentNum) {
		up = true;
	}
	else {
		up = false;
	}
	for (int j = 0; j < i; ++j) {
		if (unusedNums[j] > currentNum) {
			upCounter++;
		}
		else {
			downCounter++;
		}
	}
	int ups[upCounter];
	int downs[downCounter];
	upCounter = 0;
	downCounter = 0;
	for (int j = 0; j < i; ++j) {
		if (unusedNums[j] > currentNum) {
			ups[upCounter] = unusedNums[j];
			upCounter++;
		}
		else {
			downs[downCounter] = unusedNums[j];
			downCounter++;
		}
	}
	totalDistance = 0;
	lowestDistance = 5000;
	if (up == true) {
		while (upCounter > 0) {
			for (int j = 0; j < upCounter; ++j) {
				if (ups[j] - currentNum <= lowestDistance) {
					closestNum = ups[j];
					lowestDistance = ups[j] - currentNum;
				}
			}
			currentNum = closestNum;
			printf("Servicing %d\n", currentNum);
			totalDistance += lowestDistance;
			lowestDistance = 5000;
			for (int j = 0; j < upCounter; ++j) {
				if (ups[j] == currentNum) {
					ups[j] = ups[upCounter - 1];
				}
			}
			upCounter--;
		}
		if (downCounter > 0) {
			totalDistance += 4999 - currentNum;
			currentNum = 4999;
			lowestDistance = 5000;
			while (downCounter > 0) {
				for (int j = 0; j < downCounter; ++j) {
					if (currentNum - downs[j] <= lowestDistance) {
						closestNum = downs[j];
						lowestDistance = currentNum - downs[j];
					}
				}	
				currentNum = closestNum;
				printf("Servicing %d\n", currentNum);
				totalDistance += lowestDistance;
				lowestDistance = 5000;
				for (int j = 0; j < downCounter; ++j) {
					if (downs[j] == currentNum) {
						downs[j] = downs[downCounter - 1];
					}
				}
				downCounter--;
			}
		}
	}
	else {
		while (downCounter > 0) {
			for (int j = 0; j < downCounter; ++j) {
				if (currentNum - downs[j] <= lowestDistance) {
					closestNum = downs[j];
					lowestDistance = currentNum - downs[j];
				}
			}
			currentNum = closestNum;
			printf("Servicing %d\n", currentNum);
			totalDistance += lowestDistance;
			lowestDistance = 5000;
			for (int j = 0; j < downCounter; ++j) {
				if (downs[j] == currentNum) {
					downs[j] = downs[downCounter - 1];
				}
			}
			downCounter--;
		}
		if (upCounter > 0) {
			totalDistance += currentNum;
			currentNum = 0;
			lowestDistance = 5000;
			while (upCounter > 0) {
				for (int j = 0; j < upCounter; ++j) {
					if (ups[j] - currentNum <= lowestDistance) {
						closestNum = ups[j];
						lowestDistance = ups[j] - currentNum;
					}
				}	
				currentNum = closestNum;
				printf("Servicing %d\n", currentNum);
				totalDistance += lowestDistance;
				lowestDistance = 5000;
				for (int j = 0; j < upCounter; ++j) {
					if (ups[j] == currentNum) {
						ups[j] = ups[upCounter - 1];
					}
				}
				upCounter--;
			}
		}

	}
	printf("Total Distance: %d\n\n", totalDistance);
	
	//C-SCAN Scheduling
	printf("C-SCAN Scheduling:\n");
	for (int j = 0; j < i; ++j) {
		unusedNums[j] = nums[j];
	}
	currentNum = initial;
	totalDistance = 0;
	lowestDistance = 5000;
	upCounter = 0;
	downCounter = 0;
	for (int j = 0; j < i; ++j) {
		if (unusedNums[j] > currentNum && unusedNums[j] - currentNum < lowestDistance) {
			closestNum = unusedNums[j];
			lowestDistance = unusedNums[j] - currentNum;
			}
		else if (currentNum >= unusedNums[j] && currentNum - unusedNums[j] < lowestDistance) {
			closestNum = unusedNums[j];
			lowestDistance = currentNum - unusedNums[j];
		}
	}
	if (closestNum > currentNum) {
		up = true;
	}
	else {
		up = false;
	}
	for (int j = 0; j < i; ++j) {
		if (unusedNums[j] > currentNum) {
			upCounter++;
		}
		else {
			downCounter++;
		}
	}
	ups[upCounter];
	downs[downCounter];
	upCounter = 0;
	downCounter = 0;
	for (int j = 0; j < i; ++j) {
		if (unusedNums[j] > currentNum) {
			ups[upCounter] = unusedNums[j];
			upCounter++;
		}
		else {
			downs[downCounter] = unusedNums[j];
			downCounter++;
		}
	}
	totalDistance = 0;
	lowestDistance = 5000;
	if (up == true) {
		while (upCounter > 0) {
			for (int j = 0; j < upCounter; ++j) {
				if (ups[j] - currentNum <= lowestDistance) {
					closestNum = ups[j];
					lowestDistance = ups[j] - currentNum;
				}
			}
			currentNum = closestNum;
			printf("Servicing %d\n", currentNum);
			totalDistance += lowestDistance;
			lowestDistance = 5000;
			for (int j = 0; j < upCounter; ++j) {
				if (ups[j] == currentNum) {
					ups[j] = ups[upCounter - 1];
				}
			}
			upCounter--;
		}
		if (downCounter > 0) {
			totalDistance += 4999 - currentNum;
			totalDistance += 4999;
			currentNum = 0;
			lowestDistance = 5000;
			while (downCounter > 0) {
				for (int j = 0; j < downCounter; ++j) {
					if (downs[j] - currentNum <= lowestDistance) {
						closestNum = downs[j];
						lowestDistance = downs[j] - currentNum;
					}
				}	
				currentNum = closestNum;
				printf("Servicing %d\n", currentNum);
				totalDistance += lowestDistance;
				lowestDistance = 5000;
				for (int j = 0; j < downCounter; ++j) {
					if (downs[j] == currentNum) {
						downs[j] = downs[downCounter - 1];
					}
				}
				downCounter--;
			}
		}
	}
	else {
		while (downCounter > 0) {
			for (int j = 0; j < downCounter; ++j) {
				if (currentNum - downs[j] <= lowestDistance) {
					closestNum = downs[j];
					lowestDistance = currentNum - downs[j];
				}
			}
			currentNum = closestNum;
			printf("Servicing %d\n", currentNum);
			totalDistance += lowestDistance;
			lowestDistance = 5000;
			for (int j = 0; j < downCounter; ++j) {
				if (downs[j] == currentNum) {
					downs[j] = downs[downCounter - 1];
				}
			}
			downCounter--;
		}
		if (upCounter > 0) {
			totalDistance += currentNum;
			totalDistance += 4999;
			currentNum = 4999;
			lowestDistance = 5000;
			while (upCounter > 0) {
				for (int j = 0; j < upCounter; ++j) {
					if (currentNum - ups[j] <= lowestDistance) {
						closestNum = ups[j];
						lowestDistance = currentNum - ups[j];
					}
				}	
				currentNum = closestNum;
				printf("Servicing %d\n", currentNum);
				totalDistance += lowestDistance;
				lowestDistance = 5000;
				for (int j = 0; j < upCounter; ++j) {
					if (ups[j] == currentNum) {
						ups[j] = ups[upCounter - 1];
					}
				}
				upCounter--;
			}
		}

	}
	printf("Total Distance: %d\n\n", totalDistance);
	
	//LOOK Scheduling
	printf("LOOK Scheduling:\n");
	for (int j = 0; j < i; ++j) {
		unusedNums[j] = nums[j];
	}
	currentNum = initial;
	totalDistance = 0;
	lowestDistance = 5000;
	upCounter = 0;
	downCounter = 0;
	for (int j = 0; j < i; ++j) {
		if (unusedNums[j] > currentNum && unusedNums[j] - currentNum < lowestDistance) {
			closestNum = unusedNums[j];
			lowestDistance = unusedNums[j] - currentNum;
			}
		else if (currentNum >= unusedNums[j] && currentNum - unusedNums[j] < lowestDistance) {
			closestNum = unusedNums[j];
			lowestDistance = currentNum - unusedNums[j];
		}
	}
	if (closestNum > currentNum) {
		up = true;
	}
	else {
		up = false;
	}
	for (int j = 0; j < i; ++j) {
		if (unusedNums[j] > currentNum) {
			upCounter++;
		}
		else {
			downCounter++;
		}
	}
	ups[upCounter];
	downs[downCounter];
	upCounter = 0;
	downCounter = 0;
	for (int j = 0; j < i; ++j) {
		if (unusedNums[j] > currentNum) {
			ups[upCounter] = unusedNums[j];
			upCounter++;
		}
		else {
			downs[downCounter] = unusedNums[j];
			downCounter++;
		}
	}
	totalDistance = 0;
	lowestDistance = 5000;
	if (up == true) {
		while (upCounter > 0) {
			for (int j = 0; j < upCounter; ++j) {
				if (ups[j] - currentNum <= lowestDistance) {
					closestNum = ups[j];
					lowestDistance = ups[j] - currentNum;
				}
			}
			currentNum = closestNum;
			printf("Servicing %d\n", currentNum);
			totalDistance += lowestDistance;
			lowestDistance = 5000;
			for (int j = 0; j < upCounter; ++j) {
				if (ups[j] == currentNum) {
					ups[j] = ups[upCounter - 1];
				}
			}
			upCounter--;
		}
		if (downCounter > 0) {
			lowestDistance = 5000;
			while (downCounter > 0) {
				for (int j = 0; j < downCounter; ++j) {
					if (currentNum - downs[j] <= lowestDistance) {
						closestNum = downs[j];
						lowestDistance = currentNum - downs[j];
					}
				}	
				currentNum = closestNum;
				printf("Servicing %d\n", currentNum);
				totalDistance += lowestDistance;
				lowestDistance = 5000;
				for (int j = 0; j < downCounter; ++j) {
					if (downs[j] == currentNum) {
						downs[j] = downs[downCounter - 1];
					}
				}
				downCounter--;
			}
		}
	}
	else {
		while (downCounter > 0) {
			for (int j = 0; j < downCounter; ++j) {
				if (currentNum - downs[j] <= lowestDistance) {
					closestNum = downs[j];
					lowestDistance = currentNum - downs[j];
				}
			}
			currentNum = closestNum;
			printf("Servicing %d\n", currentNum);
			totalDistance += lowestDistance;
			lowestDistance = 5000;
			for (int j = 0; j < downCounter; ++j) {
				if (downs[j] == currentNum) {
					downs[j] = downs[downCounter - 1];
				}
			}
			downCounter--;
		}
		if (upCounter > 0) {
			lowestDistance = 5000;
			while (upCounter > 0) {
				for (int j = 0; j < upCounter; ++j) {
					if (ups[j] - currentNum <= lowestDistance) {
						closestNum = ups[j];
						lowestDistance = ups[j] - currentNum;
					}
				}	
				currentNum = closestNum;
				printf("Servicing %d\n", currentNum);
				totalDistance += lowestDistance;
				lowestDistance = 5000;
				for (int j = 0; j < upCounter; ++j) {
					if (ups[j] == currentNum) {
						ups[j] = ups[upCounter - 1];
					}
				}
				upCounter--;
			}
		}

	}
	printf("Total Distance: %d\n\n", totalDistance);
	
	//C-LOOK Scheduling
	printf("C-LOOK Scheduling:\n");
	for (int j = 0; j < i; ++j) {
		unusedNums[j] = nums[j];
	}
	currentNum = initial;
	totalDistance = 0;
	lowestDistance = 5000;
	upCounter = 0;
	downCounter = 0;
	for (int j = 0; j < i; ++j) {
		if (unusedNums[j] > currentNum && unusedNums[j] - currentNum < lowestDistance) {
			closestNum = unusedNums[j];
			lowestDistance = unusedNums[j] - currentNum;
			}
		else if (currentNum >= unusedNums[j] && currentNum - unusedNums[j] < lowestDistance) {
			closestNum = unusedNums[j];
			lowestDistance = currentNum - unusedNums[j];
		}
	}
	if (closestNum > currentNum) {
		up = true;
	}
	else {
		up = false;
	}
	for (int j = 0; j < i; ++j) {
		if (unusedNums[j] > currentNum) {
			upCounter++;
		}
		else {
			downCounter++;
		}
	}
	ups[upCounter];
	downs[downCounter];
	upCounter = 0;
	downCounter = 0;
	for (int j = 0; j < i; ++j) {
		if (unusedNums[j] > currentNum) {
			ups[upCounter] = unusedNums[j];
			upCounter++;
		}
		else {
			downs[downCounter] = unusedNums[j];
			downCounter++;
		}
	}
	totalDistance = 0;
	lowestDistance = 5000;
	if (up == true) {
		while (upCounter > 0) {
			for (int j = 0; j < upCounter; ++j) {
				if (ups[j] - currentNum <= lowestDistance) {
					closestNum = ups[j];
					lowestDistance = ups[j] - currentNum;
				}
			}
			currentNum = closestNum;
			printf("Servicing %d\n", currentNum);
			totalDistance += lowestDistance;
			lowestDistance = 5000;
			for (int j = 0; j < upCounter; ++j) {
				if (ups[j] == currentNum) {
					ups[j] = ups[upCounter - 1];
				}
			}
			upCounter--;
		}
		if (downCounter > 0) {
			totalDistance += currentNum;
			currentNum = 0;
			lowestDistance = 5000;
			while (downCounter > 0) {
				for (int j = 0; j < downCounter; ++j) {
					if (downs[j] - currentNum <= lowestDistance) {
						closestNum = downs[j];
						lowestDistance = downs[j] - currentNum;
					}
				}	
				currentNum = closestNum;
				printf("Servicing %d\n", currentNum);
				totalDistance += lowestDistance;
				lowestDistance = 5000;
				for (int j = 0; j < downCounter; ++j) {
					if (downs[j] == currentNum) {
						downs[j] = downs[downCounter - 1];
					}
				}
				downCounter--;
			}
		}
	}
	else {
		while (downCounter > 0) {
			for (int j = 0; j < downCounter; ++j) {
				if (currentNum - downs[j] <= lowestDistance) {
					closestNum = downs[j];
					lowestDistance = currentNum - downs[j];
				}
			}
			currentNum = closestNum;
			printf("Servicing %d\n", currentNum);
			totalDistance += lowestDistance;
			lowestDistance = 5000;
			for (int j = 0; j < downCounter; ++j) {
				if (downs[j] == currentNum) {
					downs[j] = downs[downCounter - 1];
				}
			}
			downCounter--;
		}
		if (upCounter > 0) {
			totalDistance += 4999 - currentNum;
			currentNum = 4999;
			lowestDistance = 5000;
			while (upCounter > 0) {
				for (int j = 0; j < upCounter; ++j) {
					if (currentNum - ups[j] <= lowestDistance) {
						closestNum = ups[j];
						lowestDistance = currentNum - ups[j];
					}
				}	
				currentNum = closestNum;
				printf("Servicing %d\n", currentNum);
				totalDistance += lowestDistance;
				lowestDistance = 5000;
				for (int j = 0; j < upCounter; ++j) {
					if (ups[j] == currentNum) {
						ups[j] = ups[upCounter - 1];
					}
				}
				upCounter--;
			}
		}

	}
	printf("Total Distance: %d\n\n", totalDistance);
	return 0;
}

	

void handler (int signal) {
	printf("Error: No initial cylinder supplied or \"request.txt\" does not exist.\n");
	exit(1);
}
