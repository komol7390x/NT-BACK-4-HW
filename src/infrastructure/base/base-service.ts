import { DeepPartial, ObjectLiteral, Repository } from "typeorm";
import { IFindOption, ISuccessRes } from "../success-res/success-interface";
import { successRes } from "../success-res/success-res";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { config } from "src/config/env-config";

export class BaseService<CreateDto, UpdateDto, Entity extends ObjectLiteral> {
    constructor(private readonly baseRepo: Repository<Entity>) { }

    get getRepository() {
        return this.baseRepo
    }
    // ---------------------------- CREATE ----------------------------

    async create(createDto: CreateDto): Promise<ISuccessRes> {
        const entity = this.baseRepo.create(createDto as DeepPartial<Entity>)
        const data = await this.baseRepo.save(entity)

        // delete unhiden info 
        delete data.is_deleted
        delete data.createdAt
        delete data.updatedAt

        return successRes(data)
    }
    // ---------------------------- FIND ALL ----------------------------

    async findAll(options?: IFindOption<Entity>) {
        const data = await this.baseRepo.find({
            select: options?.select || {},
            relations: options?.relations || [],
            where: { ...(options?.where as Entity), is_deleted: false },
        })

        // return success
        return successRes(data)
    }

    // ---------------------------- FIND BY ONE ----------------------------

    async findOneBy(options?: IFindOption<Entity>) {
        // find option
        const data = await this.baseRepo.find({
            select: options?.select || {},
            relations: options?.relations || [],
            where:{...(options?.where as Entity), is_deleted: false },
        });

        // not found
        if (!data) {
            throw new NotFoundException(
                `not found on ${String(this.baseRepo.metadata.name).split('Entity')[0]}`,
            );
        }
        return successRes(data);
    }
    // ---------------------------- FIND BY ID ----------------------------

    async findOneById(id: number, options?: IFindOption<Entity>): Promise<ISuccessRes> {

        // find one
        const data = await this.baseRepo.find({
            where: { id, ...(options?.where as Entity), is_deleted: false },
            relations: options?.relations,
        })

        // not found
        if (!data) {
            throw new NotFoundException(
                `not found this id => ${id} on ${String(this.baseRepo.metadata.name).split('Entity')[0]}`,
            );
        }
        return successRes(data)
    }

    // ---------------------------- FIND BY REPOSITORY ----------------------------

    async findByIdRepository<T extends ObjectLiteral>(
        repository: Repository<T>,
        id: number,
    ): Promise<ISuccessRes> {
        const data = await repository.findOne({
            where: { id, is_deleted: false } as unknown as Entity,
        });
        if (!data) {
            throw new NotFoundException(
                `not found this id => ${id} on ${String(repository.metadata.name).split('Entity')[0]}`,
            );
        }
        return successRes(data);
    }
}