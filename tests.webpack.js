var context = require.context('./src', true, /.*-test\.(js|jsx|coffee)$/);
context.keys().forEach(context);
