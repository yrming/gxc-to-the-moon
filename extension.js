const vscode = require('vscode');
const superagent = require('superagent');
const cheerio = require('cheerio');

function activate(context) {
	let statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
    statusBar.text = '$(telescope) GXC to the moon';
    statusBar.command = 'extension.GXCToTheMoon';
    statusBar.tooltip = 'Has GXC already landed on the moon?';
    statusBar.show();
    let disposable = vscode.commands.registerCommand('extension.GXCToTheMoon', function () {
        const url = 'https://m.feixiaohao.com/search?word=%E5%85%AC%E4%BF%A1%E5%AE%9D';
        superagent.get(url).end((err, res) => {
            let $ = cheerio.load(res.text);
            let price = $('td:nth-child(4)').text();
            if (price && Number(price) >= 500) {
                vscode.window.showInformationMessage('GXC, you\'ve really made the grade!');
            } else {
                vscode.window.showInformationMessage('GXC, this is ground control, may god\'s love be with you.');
            }
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
