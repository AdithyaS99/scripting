import { Inject, Injectable } from "@nestjs/common";
import { Client } from "@opensearch-project/opensearch";

@Injectable()
export class SearchService {
    constructor(@Inject('opensearch-client') private readonly opensearchClient: Client){

    }

    async createIndex(index_name)
    {
        const response = await this.opensearchClient.indices.create({
            index: index_name
        })
        return response.body;
    }


    async putMapping(index_name, mapping)
    {
        const response = await this.opensearchClient.indices.putMapping({
            index: index_name,
            body: mapping
        })

        return response.body;
    }

    async addDocToIndex(index_name, doc)
    {
        const response = await this.opensearchClient.index({
            index: index_name,
            body: doc,
            refresh: true
        })

        return response.body;
    }

    async searchDoc(index_name, query)
    {
        const response = await this.opensearchClient.search({
            index: index_name,
            body:query
        })

        return response.body;
    }

    async searchAll(index_name)
    {
        const response = await this.opensearchClient.search({
            index: index_name
        })
    }

    async deleteDoc(index_name, id)
    {
        const response = await this.opensearchClient.delete({
            index: index_name,
            id: id
        })
    }

    async deleteIndex(index_name)
    {
        const response = await this.opensearchClient.indices.delete({
            index:index_name
        })

        return response.body;
    }

    async updateDoc(index_name, id, query)
    {
        await this.opensearchClient.update()
        const response = await this.opensearchClient.updateByQuery({
            index: index_name,
            body: query
        })
    }
}