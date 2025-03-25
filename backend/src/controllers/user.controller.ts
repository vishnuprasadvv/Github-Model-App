import { Request, Response } from "express";
import { UserService } from "../services/user.service";

const userService = new UserService();

export class UserController {
    async fetchUser(req: Request, res: Response) {
        try {
            const {username} = req.params; 
            console.log(username)
            const user = await userService.getUserFromGitHub(username);
            res.status(200).json(user);
        } catch (error) {
            console.log('create error', error)
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
                return;
            }
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const {username} = req.params;
            console.log('delete', username)
            await userService.deleteUser(username);
            res.status(200).json({message : 'User deleted'})
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    };

    async updateUser(req: Request, res: Response) {
        try {
            const {username} = req.params;
            const updates = req.body;
            const updatedUser = await userService.updateUser(username, updates);
            res.status(200).json(updatedUser);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
                return;
            }
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }


    async getUsersSorted(req: Request, res: Response) {
        try {
          const { sortField } = req.query;
          const users = await userService.getAllUsersSorted(sortField as string);
          res.status(200).json(users);
        } catch (error:unknown) {
         if (error instanceof Error) {
                res.status(500).json({ error: error.message });
                return;
            }
            res.status(500).json({ error: 'An unknown error occurred' });
        }
      };

}