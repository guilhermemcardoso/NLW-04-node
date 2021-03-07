import { Router } from 'express';
import { UserController } from './controllers/UserController';
import { SurveyController } from './controllers/SurveyController';
import { MailController } from './controllers/MailController';
import { AnswerController } from './controllers/AnswerController';
import { NpsController } from './controllers/NpsController';

const router = Router();
const userController = new UserController();
const surveyController = new SurveyController();
const mailController = new MailController();
const answerController = new AnswerController();
const npsController = new NpsController();

/**
 * @swagger
 * tags:
 *   name: Users
 */

/**
 * @swagger
 * tags:
 *   name: Surveys
 */

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [Users]
 *     description: Create new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name.
 *                 example: John Foo
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: john@mail.com
 *     responses:
 *       201:
 *         description: Returns the created user
 *       400:
 *         description: The user/email is invalid or already exists
 *       500:
 *         description: Internal error
 */
router.post('/users', userController.create);

/**
 * @swagger
 * /surveys:
 *   post:
 *     tags: [Surveys]
 *     description: Create new survey
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The survey's title.
 *                 example: New Title
 *               description:
 *                 type: string
 *                 description: The surveys's description.
 *                 example: A simple description here
 *     responses:
 *       201:
 *         description: Returns the created survey
 *       500:
 *         description: Internal error
 */
router.post('/surveys', surveyController.create);

/**
 * @swagger
 * /surveys:
 *   get:
 *     tags: [Surveys]
 *     description: Lists all Surveys
 *     responses:
 *       200:
 *         description: Returns a list containing all the surveys
 *       500:
 *         description: Internal error
 */
router.get('/surveys', surveyController.show);

/**
 * @swagger
 * /send-mail:
 *   post:
 *     tags: [Surveys]
 *     description: Send fake email to user so the user can answer the survey
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The users's email.
 *                 example: john@mail.com
 *               survey_id:
 *                 type: string
 *                 description: The surveys's id.
 *                 example: YDkK2G-3nSO.bz6-YDkLexREJn9lJJXkAAAAAhFbvFsLj1i9l6NCWZrbDXg
 *     responses:
 *       201:
 *         description: Returns the created survey
 *       500:
 *         description: Internal error
 */
router.post('/send-mail', mailController.execute);

/**
 * @swagger
 * /answers/:value:
 *   get:
 *     tags: [Surveys]
 *     description: Answer a survey
 *     parameters:
 *       - in: path
 *         name: value
 *         required: true
 *         description: Numeric value between 1 and 10 to answer a survey.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: u
 *         required: true
 *         description: User's UUID who will author the answer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the relationship between user and usrvey
 *       400:
 *         description: User's UUID is invalid
 *       500:
 *         description: Internal error
 */
router.get('/answers/:value', answerController.execute);

/**
 * @swagger
 * /nps/:survey_id:
 *   get:
*      tags: [Surveys]
 *     description: Show the survey NPS
 *     parameters:
 *       - in: path
 *         name: survey_id
 *         required: true
 *         description: Surveys's UUID to calculate the NPS.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the calculated survey NPS according to the users answers
 *       500:
 *         description: Internal error
 */
router.get('/nps/:survey_id', npsController.execute);

export { router };