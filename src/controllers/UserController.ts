import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';

class UserController {

    async create(request: Request, response: Response) {
        const { name, email } = request.body;

        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(),
        });

        try {
            await schema.isValid(request.body)
        } catch (error) {
            throw new AppError(error);
        }

        const userRepository = getCustomRepository(UserRepository);

        const alreadyExists = await userRepository.findOne({ email });

        if (alreadyExists) {
            throw new AppError("User already exists");
        }

        const user = userRepository.create({
            name, email
        });

        await userRepository.save(user);

        response.status(201).json(user);
    }

}

export { UserController };