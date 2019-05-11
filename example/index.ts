import { TypedRouteBuilder, addOptionalParameter, addParameter, addSegment, createRoute } from "../src";

/**
 * This example describes a route to the user editor,
 * selecting a user by the ID attribute,
 * editing
 * the given field,
 * and then redirecting elsewhere.
 */

const userEditorRoute1 = new TypedRouteBuilder()
    .segment('1-manage')
    .segment('users')
    .parameter<{ id: number }>('id')
    .segment('edit')
    .parameter<{ field: string }>('field')
    .optionalParameter<{ redirect: string }>('redirect')
    .optionalParameter<{ hash: string }>('hash')
    .typedRoute();

console.log('Template:');
console.log('\t' + userEditorRoute1.template);
console.log('Results:');

const userEditorRoute2 = addOptionalParameter<{ hash: string }>('hash')(
    addOptionalParameter<{ redirect?: string }>('redirect')(
        addParameter<{ field: string }>('field')(
            addSegment('edit')(
                addParameter<{ id: number }>('id')(
                    addSegment('users')(
                        addSegment('2-manage')(
                            createRoute()
                        )
                    )
                )
            )
        )
    )
);

const userEditorRoute3_0 = createRoute();
const userEditorRoute3_1 = addSegment('3-manage')(userEditorRoute3_0);
const userEditorRoute3_2 = addSegment('users')(userEditorRoute3_1);
const userEditorRoute3_3 = addParameter<{ id: number }>('id')(userEditorRoute3_2);
const userEditorRoute3_4 = addSegment('edit')(userEditorRoute3_3);
const userEditorRoute3_5 = addParameter<{ field: string }>('field')(userEditorRoute3_4);
const userEditorRoute3_6 = addOptionalParameter<{ redirect: string }>('redirect')(userEditorRoute3_5);
const userEditorRoute3_7 = addOptionalParameter<{ hash: string }>('hash')(userEditorRoute3_6);

const params: typeof userEditorRoute1.parameters = {
    id: 25,
    field: 'the_field_i_edit',
    redirect: undefined,// 'uri_home{3}',
    hash: '#pound'
};

const argId = userEditorRoute1.args(params.id);
const argField = argId(params.field);
const argRedirect = argField(params.redirect);
const argHash = argRedirect(params.hash);
console.log(argHash);

console.log(userEditorRoute1.fill(params.hash, params.redirect, params.field, params.id));
console.log(userEditorRoute2.fill(params.hash, params.redirect, params.field, params.id));
console.log(userEditorRoute3_7.fill(params.hash, params.redirect, params.field, params.id));

console.log(userEditorRoute2.args(params.id)(params.field)(params.redirect)(params.hash));

const simpleRoute = new TypedRouteBuilder().segment('hi').segment('there').typedRoute();
console.log(simpleRoute.template);
console.log(simpleRoute.args);
