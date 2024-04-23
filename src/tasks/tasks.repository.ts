import { EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task.status.enum";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task>{
    async createTask(createTaskDto: CreateTaskDto){
        const { name, description } = createTaskDto
        const task: Task = this.create({
            name, description,
            status: TaskStatus.OPEN
        })
        await this.save(task)
        return task
    }
}