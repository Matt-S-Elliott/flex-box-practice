const ROWHEIGHT = "200px";
let currentRowID = 0;

const boxHandler = {
    rows: [],
    drawBoxes: function () {
        $("#box-container").empty();
        this.rows.forEach(row => {
            let newRow = $(`<div class="row"></div>`);
            row.columns.forEach(col => {
                let newCol = $(`<div style="height: ${ROWHEIGHT}" class="box col-md-${col.width}"></div>`);
                newCol.append($(`<button data-rowid="${col.rowID}" data-colid="${col.colID}" class="dimensionButton" value="growWidth">Wider</button>`));
                newCol.append($(`<button data-rowid="${col.rowID}" data-colid="${col.colID}" class="dimensionButton" value="shrinkWidth">Narrower</button>`));
                newCol.append($(`<button data-rowid="${col.rowID}" data-colid="${col.colID}" class="dimensionButton" value="growHeight">Taller</button>`));
                newCol.append($(`<button data-rowid="${col.rowID}" data-colid="${col.colID}" class="dimensionButton" value="shrinkHeight">Shorter</button>`));
                newRow.append(newCol);
            });
            $("#box-container").append(newRow);
        });
    }
}
boxHandler.rows.push(new Row(currentRowID));

$(document).ready(function () {
    boxHandler.drawBoxes();
    $($(document)).on("click", "button", function (event) {
        let clicked = $(this)[0];
        console.log(clicked);
        if (clicked.id === "add-box-button") {
            event.preventDefault();
            if (boxHandler.rows[currentRowID ].totalWidth >= 12) {
                boxHandler.rows.push(new Row(currentRowID));
                currentRowID++;
                console.log("currentRowID: " + currentRowID);
            } else {
                boxHandler.rows[currentRowID].addColumn();
            }
            boxHandler.drawBoxes();
        }

        if ($(clicked).val() === "growWidth") {
            console.log($(clicked).data("rowid"));
            console.log($(clicked).data("colid"));
            boxHandler.rows[$(clicked).data("rowid")].columns[$(clicked).data("colid")].growWidth();
            boxHandler.drawBoxes();
        } else if ($(clicked).val() === "shrinkWidth") {

        } else if ($(clicked).val() === "growHeight") {

        } else if ($(clicked).val() === "shrinkHeight") {

        }
    });
})


function Row(rowID) {
    this.rowID = rowID;
    this.currentColID = 0;
    this.totalWidth = 1;
    this.totalHeight = 1;
    this.columns = [];
    this.addColumn = function () {
        this.calculateDimensions();
        if (this.totalWidth <= 11) {
            this.columns.push(new Column(this.rowID, this.currentColID));
            this.currentColID++;
        } else { console.log("Too long to add a column!") }
    }
    this.calculateDimensions = function () {
        let newWidth = 0;
        let newHeight = 0;
        this.columns.forEach(col => {
            if (newHeight < col.height) {
                newHeight = col.height;
            }
            newWidth += col.width;
        });
        this.totalHeight = newHeight;
        this.totalWidth = newWidth;
    }
    this.addColumn();
}

function Column(rowID, colID) {
    this.rowID = rowID;
    this.colID = colID;
    this.width = 1;
    this.height = 1;
    this.growWidth = function () {
        boxHandler.rows[this.rowID].calculateDimensions();
        if (boxHandler.rows[this.rowID].totalWidth <= 11) {
            this.width += 1;
            console.log("Width: " + this.width);
        } else { console.log("Too long to increase width!") }
    }
    this.growHeight = function () {
        this.height += 1;
        console.log("Height: " + this.height);
    }
}

