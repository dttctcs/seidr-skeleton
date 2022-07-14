from . import appbuilder
from seidr.apis import AuthApi, InfoApi

appbuilder.add_api(AuthApi)
appbuilder.add_api(InfoApi)
