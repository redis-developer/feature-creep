import {
  //ClientAttributes,
  ProviderAttribute,
  UserPool,
  UserPoolIdentityProviderGoogle,
  UserPoolClient,
} from '@aws-cdk/aws-cognito';
import * as cdk from '@aws-cdk/core';

const DOMAIN_NAME = 'featurecreep.app';
export class AuthStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /*     // Domain + TLS stuff
        const zone = new PublicHostedZone(this, 'HostedZone', {
          zoneName: 'featurecreep.app'
        });

        // TLS certificate
        const certificateArn = new acm.DnsValidatedCertificate(this, 'SiteCertificate', {
          domainName: DOMAIN_NAME,
          hostedZone: zone,
          region: 'eu-west-1',
        }).certificateArn;
        new cdk.CfnOutput(this, 'Certificate', { value: certificateArn }); */

    // Cognito User Pool with Email Sign-in Type.
    const userPool = new UserPool(this, 'userPool', {});
    
    // Create a Google Provider
    const provider = new UserPoolIdentityProviderGoogle(this, 'googleProvider', {
        userPool: userPool,
        clientId: 'clientId', // Replace with client id from Google Dev console
        clientSecret: 'clientSecret', // Replace with client secret from Google Dev console
        attributeMapping: {
            email: ProviderAttribute.GOOGLE_EMAIL,
            givenName: ProviderAttribute.GOOGLE_GIVEN_NAME,
        },
        scopes: ['profile', 'email', 'openid']
    })

    // Register the google provider with the userPool
    userPool.registerIdentityProvider(provider);

    /* App Client */
    /*
    const clientWriteAttributes = new ClientAttributes().withStandardAttributes(
      { email: true }
    );

    const clientReadAttributes = clientWriteAttributes.withStandardAttributes({
      emailVerified: true,
    });
    */

    const userPoolClient = new UserPoolClient(this, 'userPoolClient', {
      userPool,
      generateSecret: false,
      preventUserExistenceErrors: true,
      //readAttributes: clientReadAttributes,
      //writeAttributes: clientWriteAttributes,
      oAuth: {
        flows: {
          implicitCodeGrant: true,
        },
        callbackUrls: ['http://localhost:3000/redirect'], //Change this to the domain of the EC2 instance
      },
    });

    /** Auth web pages */
    const domain = userPool.addDomain('CognitoDomain', {
      cognitoDomain: {
        domainPrefix: 'feature-creep',
      },
    });

    domain.signInUrl(userPoolClient, {
      redirectUri: 'http://localhost:3000/redirect', //Change this to the domain of the EC2 instance
    });
  }
}
