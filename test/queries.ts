import { gql } from 'apollo-server-core';

export const GET_ALL_ALERTS = gql`
    query getAllAlerts {
        getAllAlerts {
            _id
            sendTo
            keyword
            delay
            nextMessage
        }
    }
`;

export const GET_ALERT_BY_SEND_TO = gql`
    query getAlertsBySendTo($sendTo: String!) {
        getAlertsBySendTo(sendTo: $sendTo) {
            _id
            sendTo
            keyword
            delay
            isActive
            nextMessage
            createdAt
            updatedAt
        }
    }
`;

export const DELETE_ALERT = gql`
    mutation deleteAlert($id: String!) {
        deleteAlert(id: $id)
    }
`;

export const CREATE_ALERT_INPUT = gql`
    input CreateAlertInputType {
        delay: Int!
        keyword: String!
        sendTo: String!
    }
`;

export const UPDATE_ALERT_INPUT = gql`
    input UpdateAlertInputType {
        delay: Int
        keyword: String
        sendTo: String
    }
`;

export const UPDATE_ALERT = gql`
    mutation updateAlert($id: String!, $alert: UpdateAlertInputType!) {
        updateAlert(id: $id, alert: $alert)
    }
`;

export const CREATE_ALERT = gql`
    mutation createAlert($alert: CreateAlertInputType!) {
        createAlert(alert: $alert)
    }
`;