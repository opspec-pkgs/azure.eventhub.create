const msRestAzure = require('ms-rest-azure');
const AzureArmEventhub = require('azure-arm-eventhub');

console.log('logging in');
// see https://github.com/Azure/azure-sdk-for-node/blob/master/runtime/ms-rest-azure/index.d.ts#L397
msRestAzure.loginWithServicePrincipalSecret(
    process.env.spId,
    process.env.spClientSecret,
    process.env.spTenantId,
    (error, credentials) => {
        if (error) {
            throw error;
        }
        console.log('login successful');

        const armEventHub = new AzureArmEventhub(credentials, process.env.subscriptionId);

        // see https://github.com/Azure/azure-sdk-for-node/blob/master/lib/services/eventHubManagement/lib/operations/eventHubs.js#L2353
        const options = {
            messageRetentionInDays: JSON.parse(process.env.messageRetentionInDays),
            partitionCount: JSON.parse(process.env.partitionCount),
        };

        console.log('creating/updating event hub');
        armEventHub.eventHubs.createOrUpdate(
            process.env.resourceGroup,
            process.env.namespace,
            process.env.name,
            options,
            error => {
                if (error) {
                    throw error;
                }
                console.log('creating/updating event hub successful');
            }
        );

    }
);