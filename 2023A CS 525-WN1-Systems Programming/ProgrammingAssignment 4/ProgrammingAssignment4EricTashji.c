#include<dirent.h>
#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<stdbool.h>
#include<sys/stat.h>
#include<unistd.h>
#include<time.h>

int main(int argc, char *argv[]) {
	char inputPath[200]; //The user-entered path for the first directory.
	char outputPath[200]; //The user-entered path for the second directory.
	char inputFilePath[200]; // The path for the file potentially being copied.
	char outputFilePath[200]; //The path for the file that content is being copied to.
	char fileChar; //A character used to iterate through the file being copied.
	DIR *inputDir; //The directory being copied.
	DIR *outputDir; //The directory that content is being copied to.
	FILE *inputFile; //The file being copied.
	FILE *outputFile; //The file that content is being copied to.
	struct dirent *dir; //A pointer used to iterate through the directory that content is being copied from.
	struct stat file1; //A struct to store stats about the file being copied.
	struct stat file2; //A struct to store stats about the file where content might be copied to.
	
	//Take input for the directory being copied from.
	printf("What is the directory you are copying from?\n");
	scanf("%s", inputPath);
	inputDir = opendir(inputPath);
	
	//If the user entered the wrong file path or the directory doesn't exist.
	if (inputDir == NULL) {
		printf("Error: This directory doesn't exist.\nBe sure you entered the file path correctly.\nEnding program.\n");
		return 0;
	}
	
	//Take input for the directory where content is being copied to.
	printf("What is the directory you are copying to?\n");
	scanf("%s", outputPath);
	outputDir = opendir(outputPath);
	
	//If the user entered the wrong file path or the directory doesn't exist.
	if (outputDir == NULL) {
		printf("Error: This directory doesn't exist.\nBe sure you entered the file path correctly.\nEnding program.\n");
		return 0;
	}
	
	//A while loop for iterating through the files in the directory being copied.
	while ((dir = readdir(inputDir)) != NULL) {
		
		//Form the file path for the file to be copied.
		strcpy(inputFilePath, inputPath);
		strcat(inputFilePath, "/");
		strcat(inputFilePath, dir->d_name);
		
		//Open the file to be copied.
		inputFile = fopen(inputFilePath, "r");
		
		//Get the stats of the file to be copied.
		stat(inputFilePath, &file1);
		
		//If the file to be copied is a directory, ignore it.
		if (S_ISDIR(file1.st_mode)) {
			continue;
		}
		
		//Form the file path for the file that content is being copied to. 
		strcpy(outputFilePath, outputPath);
		strcat(outputFilePath, "/");
		strcat(outputFilePath, dir->d_name);
		
		//Check to see if the file being copied already exists in the directory where content is being copied to.
		if (access(outputFilePath, F_OK) == 0) {
			
			//Get the stats of the file where content is being copied to.
			stat(outputFilePath, &file2);
			
			//Check to see if the file to be copied has been updated since the last backup.
			if (difftime(file1.st_mtime, file2.st_mtime) > 0) {
			
				//Open the file where content is to be copied to.
				outputFile = fopen(outputFilePath, "w");
				
				//Iterate through the file being copied and copy the content to the file 
				//where content is being copied to.
				while ((fileChar = fgetc(inputFile)) != EOF) {
					fputc(fileChar, outputFile);
				}
			}

		}
		
		//If the file does not already exist
		else {
			//Open a new file in the directory where content is being copied to.
			outputFile = fopen(outputFilePath, "w");
			
			//Copy the content from the original file to the file where content is being copied to.
			while ((fileChar = fgetc(inputFile)) != EOF) {
				fputc(fileChar, outputFile);
			}
		}
	}
	
	
	//Close the directories.
	closedir(inputDir);
	closedir(outputDir);
	
	//End the program.
	return 0;
}


