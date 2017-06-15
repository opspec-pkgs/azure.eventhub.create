const msRestAzure = require('ms-rest-azure');
const AzureArmEventhub = require('azure-arm-eventhub');

const login = async () => {
    const loginType = process.env.loginType;
    const loginId = process.env.loginId;
    const loginSecret = process.env.loginSecret;
    const loginOpts = { domain: process.env.loginTenantId};

    if (loginType === 'sp') {
        // https://github.com/Azure/azure-sdk-for-node/blob/master/runtime/ms-rest-azure/index.d.ts#L397
        return msRestAzure.loginWithServicePrincipalSecret(loginId, loginSecret, loginOpts);
    } else {
        // https://github.com/Azure/azure-sdk-for-node/blob/master/runtime/ms-rest-azure/index.d.ts#L356
        return msRestAzure.loginWithUsernamePassword(loginId, loginSecret, loginOpts);
    }
};

console.log('logging in');
credentials = login().then(credentials => {
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
});