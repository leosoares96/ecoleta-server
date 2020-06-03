import { Request, Response } from 'express'
import knex from '../database/connection';

class PointsController {
    async show(request: Request, response: Response){
        const id = request.params.id
        // or const {id} = request.params
        const point = await knex('points').where('id',id).first();

        if(!point){
            return response.status(400).json({message: 'Point not fould.'})
        }

        const items = await knex('items')
            .join('points_items','items.id', '=', 'points_items.item_id')
            .where('points_items.point_id', id)

        return response.json({point, items});
    }

    async create(request: Request, response: Response){


        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;
    

        const trx = await knex.transaction();
    
        const point = {   
            image: 'image-fake',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        };
    
        const insertedIds = await trx('points').insert(point);
        
        const point_id = insertedIds[0];
    
        const pointItems = items.map((item_id: number )=> {
            return {
                item_id,
                point_id,
            }
        });
    
        await trx('points_items').insert(pointItems);
        
        
        await trx.commit();

        return response.json(
            {
                point_id,
                ...point
            }
        );
        
    }
}

export default PointsController