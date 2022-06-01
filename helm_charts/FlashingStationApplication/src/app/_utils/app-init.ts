import { KeycloakService } from 'keycloak-angular';
import { environment } from '../../environments/environment';

export function initializer(keycloak: KeycloakService): () => Promise<any> {
    return (): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            try {
                const func = async () => {
                    return document.URL.includes('auth');
                };
                //turns true if auth is required
                const auth = await func();
                //if(true){
                if (auth) {
                    
                    console.log('kc-init');
        
                    await keycloak.init({
                        config: {
                            url: environment.settings.keycloakUrl,
                            realm: environment.settings.realm,
                            clientId: environment.settings.clientId
                        },
                        initOptions: {
                            onLoad: 'login-required',
                            checkLoginIframe: environment.settings.checkLoginIframe
                        },
                        loadUserProfileAtStartUp: true,
                        enableBearerInterceptor: true,
                        bearerPrefix: 'Bearer',
                        bearerExcludedUrls: [
                             '/assets',
                            '/clients/public']
                    });
           
                }
                console.log(keycloak)
                console.log("resolving now...")
                resolve(true);
            } catch (error) {
                reject(error);
            }
        });
    };
}