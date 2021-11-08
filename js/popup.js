document.addEventListener("DOMContentLoaded", () => {
    [{
        "title": "プログラムブロック",
        "alert": "一部のアニメーションが動かなくなる可能性がありますが大幅に高速化が見込めます",
        "id": "scriptblock"
    }, {
        "title": "デザインブロック",
        "alert": "一部のデザインが崩れる可能性があります",
        "id": "styleblock"
    }, {
        "title": "広告ブロック",
        "alert": "広告がブロックされます",
        "id": "adblock",
    }].forEach((item) => {
        let title = document.createElement("p");
        title.textContent = item.title;
        document.getElementById("textbox").appendChild(title);
        let element = document.createElement("button");
        element.setAttribute("type", "button");
        element.setAttribute("id", item.id);
        element.setAttribute("status", "disable");
        element.textContent = "無効";
        element.addEventListener("click", function() {
            if (this.getAttribute("status") == "enable") {
                this.setAttribute("status", "disable");
                this.textContent = "無効";
                chrome.declarativeNetRequest.updateEnabledRulesets({
                    disableRulesetIds: [item.id]
                });
            } else if (this.getAttribute("status") == "disable") {
                this.setAttribute("status", "enable");
                this.textContent = "有効";
                chrome.declarativeNetRequest.updateEnabledRulesets({
                    enableRulesetIds: [item.id]
                });
            }
        });
        document.getElementById("textbox").appendChild(element);
        let alert = document.createElement("p");
        alert.textContent = item.alert;
        alert.setAttribute("class", "alert");
        document.getElementById("textbox").appendChild(alert);
    });
    chrome.declarativeNetRequest.getEnabledRulesets((ids) => {
        ids.forEach((id) => {
            document.getElementById(id).setAttribute("status", "enable");
            document.getElementById(id).textContent = "有効";
        });
    });
});