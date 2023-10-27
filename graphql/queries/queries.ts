import {gql} from '@apollo/client'

export const GET_CUSTOMERS = gql`
    query GetCustomers {
        getCustomers {
            value {
                email
                name
            }
            name
        }
    }
`;

export const GET_ORDERS = gql`
    query GetOrders{
        getOrders {
            value {
                carrier
                createdAt
                trackingId
                shippingCost
                Lat
                Lng
                City
                Address
                trackingItems {
                    customer {
                        email
                        name
                    }
                    customer_id
                    items {
                        item_id
                        name
                        price
                        quantity
                    }
                }
            }
        }
    }
  `