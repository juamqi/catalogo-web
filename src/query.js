export default function userProducts(email) {
    return [
        {
            "$match": {
                "email": email
            }
        },
        {
            "$addFields": {
                "strId": {
                    "$toString": "$_id"
                }
            }
        },
        {
            "$lookup": {
                "from": "relations",
                "localField": "strId",
                "foreignField": "from",
                "as": "saved_product",
                "pipeline": [
                    {
                        "$match": {
                            "type": "saved_product"
                        }
                    },
                    {
                        "$addFields": {
                            "objTo": {
                                "$toObjectId": "$to"
                            }
                        }
                    },
                    {
                        "$lookup": {
                            "from": "objects",
                            "localField": "objTo",
                            "foreignField": "_id",
                            "as": "product",
                            "pipeline": [
                                {
                                    "$lookup": {
                                        "from": "objecttypes",
                                        "localField": "type",
                                        "foreignField": "_id",
                                        "as": "object_type"
                                    }
                                },
                                {
                                    "$unwind": "$object_type"
                                },
                                {
                                    "$project": {
                                        "name": 1,
                                        "description": 1,
                                        "type": 1,
                                        "tags": 1,
                                        "category": "$object_type.name",
                                        "props": {
                                            "price": 1,
                                            "images": 1
                                        },
                                        "published": "$updatedAt"
                                    }
                                }
                            ]
                        }
                    },
                    {
                        "$unwind": "$product"
                    },
                    {
                        "$project": {
                            "props": 1,
                            "product": 1
                        }
                    }
                ]
            }
        },
        {
            "$project": {
                "email": 1,
                "name": 1,
                "last_name": 1,
                "image": 1,
                "phone": 1,
                "saved_product": 1
            }
        }
    ]
}