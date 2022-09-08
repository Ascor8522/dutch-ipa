export const isProduction = () => !!Deno.env.get("DENO_DEPLOYMENT_ID");
