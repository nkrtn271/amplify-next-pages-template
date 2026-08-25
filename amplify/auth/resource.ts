//import { defineAuth } from '@aws-amplify/backend';
import { defineAuth, secret } from '@aws-amplify/backend';
/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      oidc: [
        {
          name: 'LINE', // Cognito内でのプロバイダー識別名
          clientId: secret("LINE_CLIENT_ID"),
          clientSecret: secret("LINE_CLIENT_SECRET"),
          issuerUrl: 'https://access.line.me',
          scopes: ['openid'],
//          attributeMapping: {
//            email: 'email',
//         },
        },
      ],
      // 実際のデプロイ環境やローカルのコールバックURLを指定
      callbackUrls: [
        'https://main.dxudjnyyl0lto.amplifyapp.com/dashboard',
//        'http://localhost:3000/dashboard'
//            'https://your-production-domain.com/',
      ],
      logoutUrls: [
        'https://main.dxudjnyyl0lto.amplifyapp.com/dashboard',
//        'http://localhost:3000/'
//            'https://your-production-domain.com/',
      ],
    },
  },
});