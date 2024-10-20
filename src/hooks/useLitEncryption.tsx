import * as LitJsSdk from '@lit-protocol/lit-node-client';
const chain = 'ethereum';
const accessControlConditions = [
    {
        contractAddress: '',
        standardContractType: '',
        chain,
        method: 'eth_getBalance',
        parameters: [':userAddress', 'latest'],
        returnValueTest: {
            comparator: '>=',
            value: '0',
        },
    },
];
const LitNode = new LitNodeClient({
    litNetwork: 'datil-dev',
});
function useHandleEncryption() {
    const handleEncryptions = async ({ data }: { data: string }) => {
        await LitNode.connect();
        const { ciphertext, dataToEncryptHash } = await LitJsSdk.encryptString(
            {
                accessControlConditions,
                dataToEncrypt: data.toString(),
            },
            LitNode
        );
        return { ciphertext, dataToEncryptHash };
    };
    return { handleEncryptions };
}
export default useHandleEncryption;
