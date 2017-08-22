import * as React from 'react';

export default class Home extends React.Component<void, void> {
    public render() {
        return <div>
            <h1></h1>
            <p>Hi! This is a simple demo single page application built with React, Redux, Typescript.</p>
            <p>It uses the template maintained by Steven Sanderson <a href="https://github.com/aspnet/JavaScriptServices">AspNet JavascriptServices</a> as a starting point.</p>
            <p>Among other things it shows how to use thunk for async requests, create controlled components, simple page validation.</p>
            <p>The main parts are:</p>
            <ul>
                <li><a href='https://get.asp.net/'>ASP.NET Core (targetting .net 4.6 so it is possible to use EF 6.*)</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
                <li><a href='https://facebook.github.io/react/'>React</a>, <a href='http://redux.js.org'>Redux</a>, and <a href='http://www.typescriptlang.org/'>TypeScript</a> for client-side code</li>
                <li><a href='https://webpack.github.io/'>Webpack</a> for building and bundling client-side resources</li>
                <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
                <li><a href='https://autofac.org'>Autofac</a> for IOC</li>
            </ul>
            
        </div>;
    }
}
