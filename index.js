const msRestAzure = require('ms-rest-azure');
const AzureArmEventhub = require('azure-arm-eventhub');
const process = require('process');

const login = async () => {
    console.log('logging in');

    const loginType = process.env.loginType;
    const loginId = process.env.loginId;
    const loginSecret = process.env.loginSecret;
    const loginOpts = {domain: process.env.loginTenantId};

    let response;
    if (loginType === 'sp') {
        // https://github.com/Azure/azure-sdk-for-node/blob/master/runtime/ms-rest-azure/index.d.ts#L397
        response = await msRestAzure.loginWithServicePrincipalSecret(loginId, loginSecret, loginOpts);
    } else {
        // https://github.com/Azure/azure-sdk-for-node/blob/master/runtime/ms-rest-azure/index.d.ts#L356
        response = await msRestAzure.loginWithUsernamePassword(loginId, loginSecret, loginOpts);
    }

    console.log('login successful');

    return response;
};

const createOrUpdate = async (credentials) => {
    console.log('creating/updating event hub');

    const armEventHub = new AzureArmEventhub(credentials, process.env.subscriptionId);

    // see https://github.com/Azure/azure-sdk-for-node/blob/master/lib/services/eventHubManagement/lib/operations/eventHubs.js#L2353
    const options = {
        messageRetentionInDays: JSON.parse(process.env.messageRetentionInDays),
        partitionCount: JSON.parse(process.env.partitionCount),
    };

    await armEventHub.eventHubs.createOrUpdate(
        process.env.resourceGroup,
        process.env.namespace,
        process.env.name,
        options,
    );

    console.log('creating/updating event hub successful');
};

login().then(createOrUpdate).catch(error => {
    console.log(error);
    process.exit(1)
});