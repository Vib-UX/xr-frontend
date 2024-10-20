import { EvmChains, SignProtocolClient, SpMode } from '@ethsign/sp-sdk';
import { privateKeyToAccount } from 'viem/accounts';
import { useQuery } from '@tanstack/react-query';
import { fetchUserData } from '@/hooks/useFitbitAuth';
import useHandleEncryption from '@/hooks/useLitEncryption';
const id = '0xec4cb484cc282f4c15ae37338a367290aab92993adc43e289b08a1bae6231c99';
export const client = new SignProtocolClient(SpMode.OnChain, {
    chain: EvmChains.polygonAmoy,
    account: privateKeyToAccount(id),
});

const SignProtocol = () => {
    const sessionCode = sessionStorage.getItem('fitbit_token');
    const { data: fitbitData } = useQuery({
        queryKey: ['user-data'],
        queryFn: () => fetchUserData(sessionCode!),
        enabled: !!sessionCode,
    });
    const { handleEncryptions } = useHandleEncryption();
    const onSubmitHandler = async () => {
        const { ciphertext, dataToEncryptHash } = await handleEncryptions({
            data: fitbitData?.age,
        });
        const createSchemaRes = await client.createSchema({
            name: 'fitness',
            data: [
                { name: 'age', type: 'string' },
                { name: 'dob', type: 'string' },
                { name: 'gender', type: 'string' },
            ],
        });
        console.log(createSchemaRes);
        const createAttestationRes = await client.createAttestation({
            schemaId: createSchemaRes.schemaId,
            data: {
                age: JSON.stringify({
                    ciphertext,
                    dataToEncryptHash,
                }),
                dob: fitbitData?.dateOfBirth,
                gender: fitbitData?.gender,
            },
            indexingValue: 'fitness',
        });
        console.log(createAttestationRes);
    };
    return (
        <>
            <div className="bg-blue-200" onClick={onSubmitHandler}>
                SignProtocol
            </div>
        </>
    );
};

export default SignProtocol;
