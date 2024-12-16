# Hokali back-end challenge
This app show the circuit for a exam.

In this project do you have the readme for run it, the DER in pdf and the json for the dbdiagram.io in a txt

## Commands:
For init the project: 
		
    1. yarn or npm i
    2. create a .env from the .env.template and in the DATABASE_URL=file:./dev.db
    3. yarn migrate or npm run migrate  

For running: 

    1. yarn dev or npm run dev -you run the app with nodemon-
    2. yarn build or npm run build -you build the dist folder-
    3. yarn start or npm run start -you run the app from the /dist folder-
    4. npx prisma studio -In another terminal you run this command to open the localhost to see database view-

In the project you have a postman collection (Hokali.postman_collection.json	) when you import it in postman do you have all the endpoint with the variables and the body for it.

But here I say you how to execute each endpoint:
http://localhost:{port}/* -> this will be in the terminal when you run the yarn dev and replace it in the endpoints
### User:

create:

	http://localhost:{port}/users
	
	body for this ep: 
	{
		"name":  "Facundo Gasser",
		"email":  "fgasser@gmail.com"
	}
### Exams
create:

	http://localhost:{port}/exams
	
	body for this ep:
	{
		"title":  "Examen de Historia",
		"questions":  [
			{
				"text":  "¿Quién descubrió América?",
				"type":  "multiple_choice",
				"options":  ["Cristóbal Colón",  "Américo Vespucio",  "Fernando de Magallanes",  "Hernán Cortés"]
			},
			{
				"text":  "La Revolución Francesa ocurrió en 1789.",
				"type":  "true_false"
			}
		]
	}

start:

	examId -> is the id for the exam in the path variable
	userId -> is the id for the user in the query parameters
		
	http://localhost:{port}/exams/:examId/start?userId={userId}

response: 
		
	examId -> is the id for the exam in the path variable
	questionId -> is the id for the questionId
	
	http://localhost:{port}/exams/:examId/questions/:questionId/answer

	body for the answer:
	{
		"attemptId":  2,
		"answer":  "False"
	}

finish:

	id -> is the if for the exam id in the path variable
	
	http://localhost:{port}/exams/:id/finish
		
	body for the ep:
	{
		"attemptId":  2
	}

get exam:
	
	id -> is the if for the exam id in the path variable
	userId -> is the id for the user in the query parameters
 
	http://localhost:{port}/exams/:id/results?userId={userId}


