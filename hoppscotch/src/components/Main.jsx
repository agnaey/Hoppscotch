import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faGlobe, faCog, faFolder, faLayerGroup, faShareAlt, faBoxOpen, faEye, faAngleLeft, faBars, faFilter, faDownload, faCopy, faRotateRight, faFloppyDisk, faFolderPlus, faClock, faTrash, faEdit, faPlus, faCircleQuestion, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { faReact } from "@fortawesome/free-brands-svg-icons";
import emptybox from "../assets/emptybox.png";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const Add = () => {
    const [selectedMethod, setSelectedMethod] = useState("GET");
    const [tabs, setTabs] = useState([{ id: 0, title: "Untitled", method: "GET", url: "https://echo.hoppscotch.io", params: [{ id: Date.now(), key: "", value: "", description: "", checked: false ,headers: [],}],}]);
    const [activeTab, setActiveTab] = useState(0);
    const [isResizing, setIsResizing] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const leftPanelRef = useRef(null);
    const rightPanelRef = useRef(null);
    const [activeSection, setActiveSection] = useState("custom-param");
    const [activeSection1, setActiveSection1] = useState("custom1-param");
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const activeTabData = tabs.find((tab) => tab.id === activeTab) || {};
    const params = activeTabData.params || [];
    const headers = activeTabData.headers || [];
    

    // Function to send API request
    const fetchAPI = async () => {
        const activeTabData = tabs.find(tab => tab.id === activeTab);
        if (!activeTabData || !activeTabData.url) {
            setError("Please enter a valid API URL.");
            return;
        }

        setLoading(true);
        setError("");
        setResponse(null);

        try {
            const options = {
                method: activeTabData.method,
                headers: { "Content-Type": "application/json" },
            };

            // Add body for POST/PUT requests
            if (["POST", "PUT", "PATCH"].includes(activeTabData.method)) {
                options.body = JSON.stringify({
                    key1: "value1",
                    key2: "value2",
                });
            }

            const res = await fetch(activeTabData.url, options);
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Something went wrong");

            setResponse(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };



    const JsonViewer = ({ json, whiteText = false }) => {
        return (
            <SyntaxHighlighter
                language="json"
                style={whiteText ? {} : dracula} // Remove styles for plain white text
                showLineNumbers
                customStyle={whiteText ? { color: "white", background: "transparent" } : {}}
            >
                {JSON.stringify(json, null, 2)}
            </SyntaxHighlighter>
        );
    };
    const jsonResponse = {
        "name": "John Doe",
        "age": 30,
        "city": "New York"
    }

    const methodColors = {
        GET: "green",
        POST: "orange",
        PUT: "rgb(0, 140, 255)",
        PATCH: "purple",
        DELETE: "red",
    };
    // const changeMethod = (method) => {
    //     setTabs((prevTabs) =>
    //         prevTabs.map((tab) => (tab.id === activeTab ? { ...tab, method } : tab))
    //     );
    //     setSelectedMethod(method);
    //     setDropdown(false);
    // };
    const changeURL = (newURL) => {
        setTabs((prevTabs) =>
            prevTabs.map((tab) => (tab.id === activeTab ? { ...tab, url: newURL } : tab))
        );
    };

    const addTab = () => {
        const newTab = { id: Date.now(), title: "Untitled", method: "GET", url: "https://echo.hoppscotch.io",params: [], headers: [], body: "" };
        setTabs([...tabs, newTab]);
        setActiveTab(newTab.id);
        setSelectedMethod("GET");
    };

    const removeTab = (id) => {
        setTabs(tabs.filter((tab) => tab.id !== id));
        if (activeTab === id && tabs.length > 1) {
            setActiveTab(tabs[0].id);
            setSelectedMethod(tabs[0].method);
        }
    };

    

    const handleInputChange = (id, field, value) => {
        setTabs((prevTabs) =>
            prevTabs.map((tab) =>
                tab.id === activeTab
                    ? {
                          ...tab,
                          params: tab.params.map((param) =>
                              param.id === id ? { ...param, [field]: value } : param
                          ),
                      }
                    : tab
            )
        );
    
        setTabs((prevTabs) =>
            prevTabs.map((tab) => {
                if (tab.id === activeTab) {
                    const lastParam = tab.params[tab.params.length - 1];
                    if (lastParam.id === id && field === "key" && value.trim() !== "") {
                        return {
                            ...tab,
                            params: [
                                ...tab.params,
                                { id: Date.now(), key: "", value: "", description: "", checked: false },
                            ],
                        };
                    }
                }
                return tab;
            })
        );
    };
    
    
    const handleHeaderChange = (id, field, value) => {
        setTabs((prevTabs) =>
            prevTabs.map((tab) =>
                tab.id === activeTab
                    ? {
                          ...tab,
                          headers: tab.headers.map((header) =>
                              header.id === id ? { ...header, [field]: value } : header
                          ),
                      }
                    : tab
            )
        );
    };
    
    

    const addRow = () => {
        setTabs((prevTabs) =>
            prevTabs.map((tab) => {
                if (tab.id === activeTab) {
                    return {
                        ...tab,
                        params: [
                            ...tab.params,
                            { id: Date.now(), key: "", value: "", description: "", checked: false },
                        ],
                    };
                }
                return tab;
            })
        );
    };
    const addHeaderRow = () => {
        setTabs((prevTabs) =>
            prevTabs.map((tab) =>
                tab.id === activeTab
                    ? {
                          ...tab,
                          headers: [
                              ...(tab.headers || []), // Ensure headers is always an array
                              { id: Date.now(), key: "", value: "", description: "", checked: false },
                          ],
                      }
                    : tab
            )
        );
    };
    
    

    const removeRow = (id) => {
        setTabs((prevTabs) =>
            prevTabs.map((tab) =>
                tab.id === activeTab
                    ? {
                          ...tab,
                          params: tab.params.filter((param) => param.id !== id),
                      }
                    : tab
            )
        );
    };
    
    const removeHeaderRow = (id) => {
        setTabs((prevTabs) =>
            prevTabs.map((tab) =>
                tab.id === activeTab
                    ? {
                          ...tab,
                          headers: tab.headers.filter((header) => header.id !== id),
                      }
                    : tab
            )
        );
    };
    
    const removeAllRows = () => {
        setTabs((prevTabs) =>
            prevTabs.map((tab) =>
                tab.id === activeTab ? { ...tab, params: [] } : tab
            )
        );
    };
    
    const removeAllHeaders = () => {
        setTabs((prevTabs) =>
            prevTabs.map((tab) =>
                tab.id === activeTab ? { ...tab, headers: [] } : tab
            )
        );
    };
    



    const showDropdown = () => {
        setDropdown((prev) => !prev);
    };

    useEffect(() => {
        const handleResize = (event) => {
            if (!isResizing) return;
            let newLeftWidth = (event.clientX / window.innerWidth) * 100;
            if (newLeftWidth > 20 && newLeftWidth < 80) {
                leftPanelRef.current.style.width = `${newLeftWidth}%`;
                rightPanelRef.current.style.width = `${100 - newLeftWidth}%`;
            }
        };

        const stopResizing = () => {
            setIsResizing(false);
        };

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdown(false);
            }
        };




        if (isResizing) {
            document.addEventListener("mousemove", handleResize);
            document.addEventListener("mouseup", stopResizing);
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousemove", handleResize);
            document.removeEventListener("mouseup", stopResizing);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isResizing]);







    return (
        <div className="main">
            <div className="sidebar d-none d-lg-block">
                <a href="#" className="sidebar-item active"><FontAwesomeIcon icon={faLink} /></a>
                <a href="#" className="sidebar-item"><FontAwesomeIcon icon={faReact} /></a>
                <a href="#" className="sidebar-item"><FontAwesomeIcon icon={faGlobe} /></a>
                <a href="#" className="sidebar-item"><FontAwesomeIcon icon={faCog} /></a>
            </div>

            {/* Left Panel */}
            <div className="panel left-panel" ref={leftPanelRef}>
                <div className="request-bar">
                    <div className="left-section">
                        {tabs.map((tab) => (
                            <div key={tab.id} className={`tab ${tab.id === activeTab ? "active" : ""}`}
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    setSelectedMethod(tab.method);
                                }}
                                style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                                <div className="request-method " style={{ color: methodColors[tab.method], fontWeight: "bold" }}>{tab.method}</div>
                                <div className="request-title">{tab.title}</div>
                                {tabs.length > 1 && (
                                    <div className="close-tab" onClick={(e) => { e.stopPropagation(); removeTab(tab.id); }}>&times;</div>
                                )}
                            </div>
                        ))}
                        <div className="add-tab" onClick={addTab}>+</div>
                    </div>

                    <div className="right-section">
                        <div className="env-select">
                            <span className="env-icon"><FontAwesomeIcon icon={faLayerGroup} /></span>
                            <span>Select environment</span>
                            <span className="dropdown-arrow">▾</span>
                        </div>
                        <div className="eye-icon text-secondary">
                            <FontAwesomeIcon icon={faEye} />
                        </div>&nbsp;&nbsp;
                    </div>
                </div>

                {/* Request Bar */}
                <div className="content" id="topContent">
                    <div className="request-bar1">
                        <div className="method-dropdown" ref={dropdownRef} style={{ color: methodColors[selectedMethod] }}>
                            <span onClick={showDropdown}><b>{tabs.find(tab => tab.id === activeTab)?.method || selectedMethod}</b></span>
                            {dropdown && (
                                <div className="mt-3 method-options" style={{ backgroundColor: "#333", borderRadius: "5px", padding: "5px" }}>
                                    {Object.keys(methodColors).map(method => (
                                        <div key={method} style={{ color: methodColors[method], padding: "5px", cursor: "pointer" }} onClick={() => changeMethod(method)}><b>{method}</b></div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <input
                            type="text"
                            className="input-url"
                            placeholder="Enter request URL"
                            value={tabs.find(tab => tab.id === activeTab)?.url || ""}
                            onChange={(e) => changeURL(e.target.value)}
                        />

                        <button className="send-button" onClick={fetchAPI} disabled={loading}>
                            {loading ? "Fetching..." : "Send"}
                        </button>


                        <button className="save-button">
                            <FontAwesomeIcon icon={faFloppyDisk} /> &nbsp; Save
                        </button>
                    </div>
                    <div className="custom">
                        {/* UI Section Tabs */}
                        <div className="custom-tab-container">

                            <div className={`custom-tab ${activeSection === "custom-param" ? "active" : ""}`} onClick={() => setActiveSection("custom-param")}>
                                <b>Parameters</b>
                            </div>
                            <div className={`custom-tab ${activeSection === "custom-body" ? "active" : ""}`} onClick={() => setActiveSection("custom-body")}>
                                <b>Body</b>
                            </div>
                            <div className={`custom-tab ${activeSection === "custom-header" ? "active" : ""}`} onClick={() => setActiveSection("custom-header")}>
                                <b>Headers</b>
                            </div>
                        </div>

                        {/* API Request Tabs Content */}
                        <div className="tab-content">
                            {tabs.map((tab) => (
                                <div key={tab.id} className={`content-panel ${tab.id === activeTab ? "active" : "d-none"}`}>

                                    {/* Query Parameters Section */}
                                    {activeSection === "custom-param" && (
                                        <div>
                                            <div className="parametrs text-secondary pb-2" style={{ display: "flex", justifyContent: "space-between" }}>
                                                <span>Query Parameters</span>
                                                <div style={{ display: "flex", gap: "18px" }}>
                                                    <FontAwesomeIcon className="mt-1" icon={faCircleQuestion} />
                                                    <FontAwesomeIcon icon={faTrash} className="delete-icon mt-1" style={{ cursor: "pointer" }} onClick={removeAllRows} />
                                                    <FontAwesomeIcon icon={faEdit} className="edit-icon mt-1" />
                                                    <FontAwesomeIcon icon={faPlus} className="plus-icon mt-1" style={{ cursor: "pointer" }} onClick={addRow} />
                                                </div>
                                            </div>

                                            {params.length > 0 ? (
                                                params.map((param) => (
                                                    <div className="parametrs" key={param.id} style={{ display: "flex", gap: "10px", alignItems: "center", overflowX: "auto" }}>
                                                        <form className="param-form w-100" style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "nowrap" }}>
                                                            <input type="text" placeholder="Key" style={{ flex: "1", minWidth: "120px" }} value={param.key} onChange={(e) => handleInputChange(param.id, "key", e.target.value)} />
                                                            <input type="text" placeholder="Value" style={{ flex: "1", minWidth: "120px" }} value={param.value} onChange={(e) => handleInputChange(param.id, "value", e.target.value)} />
                                                            <input type="text" placeholder="Description" style={{ flex: "1", minWidth: "150px" }} value={param.description} onChange={(e) => handleInputChange(param.id, "description", e.target.value)} />
                                                            <input type="checkbox" checked={param.checked} onChange={(e) => handleInputChange(param.id, "checked", e.target.checked)} />
                                                            <FontAwesomeIcon icon={faTrash} className="para-delete delete-icon mt-1" style={{ cursor: "pointer" }} onClick={() => removeRow(param.id)} />
                                                        </form>
                                                    </div>
                                                ))
                                            ) : (
                                                <p></p>
                                            )}
                                        </div>
                                    )}

                                    {/* Headers Section (Same as Parameters) */}
                                    {activeSection === "custom-header" && (
                                        <div>
                                            <div className="parametrs text-secondary pb-2" style={{ display: "flex", justifyContent: "space-between" }}>
                                                <span>Header List</span>
                                                <div style={{ display: "flex", gap: "18px" }}>
                                                    <FontAwesomeIcon className="mt-1" icon={faCircleQuestion} />
                                                    <FontAwesomeIcon icon={faTrash} className="delete-icon mt-1" style={{ cursor: "pointer" }} onClick={removeAllHeaders} />
                                                    <FontAwesomeIcon icon={faEdit} className="edit-icon mt-1" />
                                                    <FontAwesomeIcon icon={faPlus} className="plus-icon mt-1" style={{ cursor: "pointer" }} onClick={addHeaderRow} />
                                                </div>
                                            </div>

                                            {headers.length > 0 ? (
                                                headers.map((header) => (
                                                    <div className="parametrs" key={header.id} style={{ display: "flex", gap: "10px", alignItems: "center", overflowX: "auto" }}>
                                                        <form className="param-form w-100" style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "nowrap" }}>
                                                            <input type="text" placeholder="Key" style={{ flex: "1", minWidth: "120px" }} value={header.key} onChange={(e) => handleHeaderChange(header.id, "key", e.target.value)} />
                                                            <input type="text" placeholder="Value" style={{ flex: "1", minWidth: "120px" }} value={header.value} onChange={(e) => handleHeaderChange(header.id, "value", e.target.value)} />
                                                            <input type="text" placeholder="Description" style={{ flex: "1", minWidth: "150px" }} value={header.description} onChange={(e) => handleHeaderChange(header.id, "description", e.target.value)} />
                                                            <input type="checkbox" checked={header.checked} onChange={(e) => handleHeaderChange(header.id, "checked", e.target.checked)} />
                                                            <FontAwesomeIcon icon={faTrash} className="para-delete delete-icon mt-1" style={{ cursor: "pointer" }} onClick={() => removeHeaderRow(header.id)} />
                                                        </form>
                                                    </div>
                                                ))
                                            ) : (
                                                <p></p>
                                            )}
                                        </div>
                                    )}

                                    {/* Request Body Section */}
                                    {activeSection === "custom-body" && (
                                        <div className="parametrs text-secondary pb-2" style={{ display: "flex", gap: "18px" }}>
                                            <span>Content Type</span>
                                            <span>None ▾</span>
                                            <span>
                                                <FontAwesomeIcon icon={faRotateRight} className="reload-icon" style={{ cursor: "pointer" }} />
                                                &nbsp;&nbsp; Override
                                            </span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* ------------------------------------------------------------------------------------------------ */}


                    <div className="custom1">
                        {/* Tabs */}
                        <div className="custom1-tab-container">
                            <div
                                className={`custom1-tab ${activeSection1 === "custom1-param" ? "active" : ""}`}
                                onClick={() => setActiveSection1("custom1-param")}
                            >
                                <b>JSON</b>
                            </div>
                            <div
                                className={`custom1-tab ${activeSection1 === "custom1-body" ? "active" : ""}`}
                                onClick={() => setActiveSection1("custom1-body")}
                            >
                                <b>Raw</b>
                            </div>
                            <div
                                className={`custom1-tab ${activeSection1 === "custom1-header" ? "active" : ""}`}
                                onClick={() => setActiveSection1("custom1-header")}
                            >
                                <b>Headers</b>
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="custom1-panel">
                            {activeSection1 === "custom1-param" && (
                                <div >
                                    <div className="parametrs text-secondary pb-2 mt-1" style={{ display: "flex", justifyContent: "space-between" }}>
                                        <span><b>Response Body</b></span>
                                        <div style={{ display: "flex", gap: "18px" }}>
                                            <FontAwesomeIcon icon={faBars} className="menu-icon text-xl mt-1" />
                                            <FontAwesomeIcon icon={faFilter} className="filter-icon mt-1" />
                                            <FontAwesomeIcon icon={faDownload} className="copy-icon mt-1" />
                                            <FontAwesomeIcon icon={faFloppyDisk} className="edit-icon mt-1" />
                                            <FontAwesomeIcon icon={faCopy} className="copy-icon mt-1" />


                                            <FontAwesomeIcon icon={faEllipsisVertical} className="three-dot-icon mt-1" style={{ cursor: "pointer", transform: "rotate(90deg)" }} />
                                        </div>

                                    </div>
                                    <div className="code p-4 w-100">
                                        {error && <p className="text-red-500 mt-2">{error}</p>}

                                        {loading && <p>Loading...</p>}

                                        {response && (
                                            <JsonViewer json={response} />
                                        )}

                                    </div>
                                </div>
                            )}

                            {activeSection1 === "custom1-body" && (
                                <div>
                                    <div className="parametrs text-secondary pb-2 mt-1" style={{ display: "flex", justifyContent: "space-between" }}>
                                        <span><b>Response Body</b></span>
                                        <div style={{ display: "flex", gap: "18px" }}>
                                            <FontAwesomeIcon icon={faBars} className="menu-icon text-xl mt-1" />
                                            <FontAwesomeIcon icon={faDownload} className="copy-icon mt-1" />
                                            <FontAwesomeIcon icon={faFloppyDisk} className="edit-icon mt-1" />
                                            <FontAwesomeIcon icon={faCopy} className="copy-icon mt-1" />


                                        </div>
                                    </div>
                                    <div className="code text-white p-4 w-100">
                                        {error && <p className="text-red-500 mt-2">{error}</p>}

                                        {loading && <p>Loading...</p>}

                                        {response && (
                                                <JsonViewer json={response} whiteText={true} />
                                        )}
                                    </div>
                                </div>
                            )}

                            {activeSection1 === "custom1-header" && (
                                <div className="parametrs text-secondary pb-2 mt-1" style={{ display: "flex", justifyContent: "space-between" }}>
                                    <span><b>Header List</b></span>
                                    <div style={{ display: "flex", gap: "18px" }}>
                                        <FontAwesomeIcon icon={faCopy} className="copy-icon mt-1" />


                                    </div>
                                </div>
                            )}
                        </div>
                    </div>



                </div>
            </div>







            {/* -----------------------------------------------------------------------------------------------------------------/ */}
            <div className="resizer d-none d-lg-block" onMouseDown={() => setIsResizing(true)} />
            {/* -----------------------------------------------------------------------------------------------------------------/ */}

            {/* Right Sidebar */}
            <div className="sidebar d-none d-lg-block">
                <a href="#" className="sidebar-item active"><FontAwesomeIcon icon={faFolder} /></a>
                <a href="#" className="sidebar-item"><FontAwesomeIcon icon={faLayerGroup} /></a>
                <a href="#" className="sidebar-item"><FontAwesomeIcon icon={faClock} /></a>
                <a href="#" className="sidebar-item"><FontAwesomeIcon icon={faShareAlt} /></a>
                <a href="#" className="sidebar-item"><FontAwesomeIcon icon={faAngleLeft} /></a>
            </div>

            {/* Right Panel */}
            <div ref={rightPanelRef} className="panel right-panel d-none d-lg-block">
                <div className="content text-secondary" >
                    <div id="righttop">
                        <p className="text-secondary">Personal Workspace &gt; Requests</p>
                    </div>
                    <div id="right-search">
                        <input className="r-search w-100" type="text" placeholder="Search" />
                    </div>
                    <div className="right-new" style={{ display: "flex", justifyContent: "space-between" }}>
                        <a href="#" className="right-new1">+ New</a>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <FontAwesomeIcon className="mt-1" icon={faCircleQuestion} />
                            <FontAwesomeIcon className="mt-1" icon={faFolderPlus} />
                        </div>
                    </div>
                    <div id="right-main" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div style={{ textAlign: "center" }}>
                            {/* <FontAwesomeIcon icon={faBoxOpen} size="5x" style={{margin: "20px auto"}} /> */}
                            <img src={emptybox} alt="Empty Box" size="5x" style={{ margin: "20px auto" }} />
                            <h4>Collections are empty</h4>
                            <p>Import or create a collection</p>
                            <button className="send-button mt-1">
                                <FontAwesomeIcon icon={faFolderPlus} /> Import
                            </button>
                            <br />
                            <button className="save-button mt-3">+ Add New</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Add;
